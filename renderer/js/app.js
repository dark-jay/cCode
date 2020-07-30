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

    fo.saveFile(); // save the curr code so that recent modification gets compiled
    compile.compileCode();
});

btnStop.addEventListener('click', e => {
    alert("kill");
    compile.killProcess();
});

function init() {
    btnRun.disabled = false;
    btnStop.disabled = true;

    
    // if the current code path is empty then
    if(!currCodePathPure && !currCodePath) {
        currCodePathPure = store.get('pathPure');
        currCodePath = store.get('path');
        try {
            fo.readFile(currCodePath);
        }
        catch(err) {
            console.log('Error Opening the file');
        }
    }
    else {

    }
    
}
