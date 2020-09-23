const fs = require('fs');
const { dialog } = require('electron').remote;
//const tab = require('./tab');

let btnSaveClick = document.getElementById('btn-save-click');
let btnOpenClick = document.getElementById('btn-open-click');
let btnNewClick = document.getElementById('btn-new-click');


btnSaveClick.addEventListener("click", () => {
    //alert('you clicked save button');
    let content = codeEditor.getSession().getValue();
    //console.log(content);

    dialog.showSaveDialog()
        .then( result => {
            if (result.canceled === false) {
                console.log("Selected file paths:");
                console.log(result.filePath);
                var filePath = result.filePath;
                currCodePathPure = filePath;
                var filePath = filePath.split('\\');
                var filePath = filePath.join('\\\\');
                currCodePath = filePath;
                
                fs.writeFile(filePath, content, (err) => {
                    if (err) {
                        console.log("Error creating the file " + err.message);
                        return;
                    }
                    alert("File creation successfull");
                    allOpenedTabsDetail[currTabId].pathPure = currCodePathPure;
                    allOpenedTabsDetail[currTabId].path = currCodePath;
                    allOpenedTabsDetail[currTabId].isStored = 1; // 1 means Yes
                });
                
            }
        }).catch(err => {
            console.log(err)
        });
}, false);


/*
dialog.showOpenDialog(remote.getCurrentWindow(), {
    properties: ["openFile", "multiSelections"]
*/
btnOpenClick.addEventListener("click", () => {
    dialog.showOpenDialog({ properties: [ 'openFile', 'multiSelections' ] })
        .then( result => {
            if (result.canceled === false) {
                console.log("Selected file paths:");
                console.log(result.filePaths[0]);
                var filePath = result.filePaths[0];
                currCodePathPure = filePath;
                var filePath = filePath.split('\\');
                var filePath = filePath.join('\\\\');
                currCodePath = filePath;

                //store.set('pathPure', currCodePathPure); // with single slash
                //store.set('path', currCodePath); // with double slash
                
                readFile(currCodePath, currCodePathPure);
                
            }
        }).catch(err => {
            console.log(err)
        });
}, false);


btnNewClick.addEventListener("click", () => {
    //alert(`Path of code is:\n${currCodePathPure}`);
    //tab.addTab();
    addTab(undefined, undefined);
}, false);


const saveFile = () => {
    let content = codeEditor.getSession().getValue();
    fs.writeFile(currCodePath, content, (err) => {
        if (err) {
            console.log("Error overriding the file " + err.message);
            return;
        }
        console.log('Recent changes updated');
    });
}

const readFile = (filePath, filePathPure) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
            console.log("Open failed: " + err.message);
            return;
        }
        /*
        codeEditor.setValue(data, 1);
        codeEditor.focus();
        codeEditor.navigateFileEnd();
        console.log("File open successfull");
        */
        var fileName = filePath.slice(filePath.lastIndexOf("\\")+1, filePath.length);

        var tempSingleTabDetail = {};
        tempSingleTabDetail["path"] = filePath;
        tempSingleTabDetail["pathPure"] = filePathPure;
        tempSingleTabDetail["tabId"] = tabId;
        tempSingleTabDetail["isStored"] = 1; // 1 means Yes
        allOpenedTabsDetail[tabId] = tempSingleTabDetail;

        addTab(data, fileName);

        // code to modify vars that represent current tab: 
        // currTabId is handled inside addTab()
        currCodePathPure = allOpenedTabsDetail[currTabId].pathPure;
        currCodePath = allOpenedTabsDetail[currTabId].path;
    });
}

exports.saveFile = saveFile;
exports.readFile = readFile;