const remote = require("electron").remote;

var minimise = document.getElementById("minimize");
var maximise = document.getElementById("maximize");
var quit = document.getElementById("close");

minimise.addEventListener("click",minimiseApp);
maximise.addEventListener("click",maximiseApp);
quit.addEventListener("click",quitApp);

function minimiseApp(){
    remote.BrowserWindow.getFocusedWindow().minimize();
}

function maximiseApp(){
    remote.BrowserWindow.getFocusedWindow().maximize();
}

function quitApp(){
    // before quiting, save all the opened && saved tabs in json file
    if(allOpenedTabsDetail.length === 0){ // no tabs
        var newData = {"name":"jack"};
        store.set(newData);
        //alert("store null");
        console.log(newData);
    }
    else {
        var tempObj = {};
        var mainTabObj = {"filesPath":[]};

        for (i=0; i<allOpenedTabsDetail.length; i++) {
            if (allOpenedTabsDetail[i]) {
                if(allOpenedTabsDetail[i].isStored === 1) { // if not undefined
                    //console.log("INSIDE THE LOOOOOOOOOOOOOOOP");
                    tempObj["path"] = allOpenedTabsDetail[i].path;
                    tempObj["pathPure"] = allOpenedTabsDetail[i].pathPure;
                    mainTabObj.filesPath.push(tempObj);
                    //console.log('inside loop: ' + mainTabObj.filesPath);
                    tempObj = {};
                }
            }
        }

        //console.log("main tab object: " + mainTabObj.filesPath[0] + "\nEND");
        store.set(mainTabObj);
    }

    // above code should be moved to electron app closing event listener
    remote.getCurrentWindow().close();
}
