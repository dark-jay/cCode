// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const compile = require('./compile/compile');
const fo = require('./file-operations');

const btnRun = document.getElementById('btn-run');
const btnStop = document.getElementById('btn-stop');

init();

btnRun.addEventListener('click', e => {

    document.getElementById("compile-reult").style.display = "none";
    document.getElementById("compile-result-spin").style.display = "inline";
    var compileReult = document.getElementById("compile-reult");
    compileReult.innerHTML = "";

    if (currCodePath === undefined && currCodePathPure === undefined) {
        console.log('Please save the file first');
        alert('Please save the file first');
    }
    else {
        fo.saveFile(); // save the curr code so that recent modification gets compiled
        compile.compileCode();
    }
});

btnStop.addEventListener('click', e => {
    alert("kill");
    compile.killProcess();
});

function init() {
    btnRun.disabled = false;
    btnStop.disabled = true;

    let parsedLastOpenedTabs = store.get();

    if (parsedLastOpenedTabs) {
        // console.log(parsedLastOpenedTabs.filesPath);
        // loop through parsedLastOpenedTabs.filesPath and open each tabs by calling fo.readFile(Path of the file);
        if (parsedLastOpenedTabs.filesPath) {
            if (parsedLastOpenedTabs.filesPath.length != 0) {
                for (i=0; i<parsedLastOpenedTabs.filesPath.length; i++) {
                    currCodePathPure = parsedLastOpenedTabs.filesPath[i].pathPure;
                    currCodePath = parsedLastOpenedTabs.filesPath[i].path;
                    try {
                        fo.readFile(currCodePath, currCodePathPure); // it will in turn call addTab()
                    }
                    catch(err) {
                        console.log('Error Opening the file');
                    }
                }
            }
            else {
                // no tabs, so create a new session
                addTab(undefined, undefined);
            }
        }
        else {
            // no tabs, so create a new session
            addTab(undefined, undefined);
        }
    }
    else {
        // no tabs, so create a new session
        addTab(undefined, undefined);
    }


    /*
    // old code before adding the tab feature

    // if the current code path is empty then get path from configFile
    if(!currCodePathPure && !currCodePath) {
        currCodePathPure = store.get('pathPure');
        currCodePath = store.get('path');
        try {
            fo.readFile(currCodePath); // it will in turn call addTab()
        }
        catch(err) {
            // console.log('Error Opening the file');
            // if configFile is also empty then create a new session
            addTab(undefined, undefined);
        }
    }
    else {
    }
    */
    
}
