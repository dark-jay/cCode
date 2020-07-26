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
    remote.getCurrentWindow().close();
}
