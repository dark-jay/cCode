// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const compile = require('./compile/compile');

const btnRun = document.getElementById('btn-run');

btnRun.addEventListener('click', e => {

    document.getElementById("compile-reult").style.display = "none";
    document.getElementById("compile-result-spin").style.display = "inline";
    
    compile.compileCode();
})
