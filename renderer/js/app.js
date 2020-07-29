// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

// const remote = require('electron').remote

//const { remote } = require('electron')
//const { fs } = remote

// const { ipcRenderer } = require('electron')

const { remote } = require('electron')

const btnRun = document.getElementById('btn-run')

btnRun.addEventListener('click', e => {
    //ipcRenderer.send('printtxt', 'text to be printed')
    //alert("start");
    //let appPath = remote.app.getAppPath()
    //let file = `${appPath}/mytext.txt`;
    //writeText(file)

    document.getElementById("compile-reult").style.display = "none";
    document.getElementById("compile-result-spin").style.display = "inline";
    //runCode();
})