const cp = require("child_process");
var kill = require('tree-kill');

let cliForMain = "";
let pid = 0;
const btnRun = document.getElementById('btn-run');
const btnStop = document.getElementById('btn-stop');

// g++ -std=c++11 -o main.out main.cpp
const compileCode = () => {
    const compiler = "g++";
    const version = "-std=c++11";
    const out = "-o";
    const infile = currCodePathPure; //"main.cpp";
    const outfile = currCodePathPure.substring(0, currCodePathPure.length-4); //"main"
    //cliForMain = 'echo 3 1 2 3 jay | ' + outfile; // command line input for main.exe

    inputCmdPreprocess(outfile);
    
    var compileProcess = cp.execFile(compiler, [version, out, outfile, infile], {shell: true}, (error, stdout, stderr)=>{
        if (error) {
            console.log(`Name: ${error.name}\nMessage: ${error.message}\nStack: ${error.stack}`);
            // throw error;
            outputEditor.setValue(`Name: ${error.name}\nMessage: ${error.message}`.toString(), 1);
            stopSpinning();
            showInfo('red', 'COMPILE ERROR');
            btnRun.disabled = false;
            btnStop.disabled = true;
        }
        else {
            console.log('Compile Successfull');
            showInfo('green', 'COMPILE SUCCESSFULL');
            runMain();
        }
    });
}

function runMain() {
    const main = cp.spawn('cmd.exe', ['/c', cliForMain]); // we can use .bat file instead of the 2nd of 2nd argument

    console.log(`main process id: ${main.pid}`);
    pid = main.pid;
    btnStop.disabled = false;
    btnRun.disabled = true;

    main.stdout.on('data', (data) => {
        //console.log(`Output:\n${data.toString()}`);
        outputEditor.setValue(data.toString(), 1);
    });

    main.stderr.on('data', (data) => {
        console.error(data.toString());
        stopSpinning();
        showInfo('red', 'RUNTIME ERROR');
        btnStop.disabled = true;
        btnRun.disabled = false;
    });

    main.on('exit', (code) => {
        console.log(`main.exe exited with code ${code}`);
        stopSpinning();
        showInfo('green', 'SUCCESS');
        btnStop.disabled = true;
        btnRun.disabled = false;
    });

    main.on("error", (err)=>{
        console.log(`Error running main: ${err}`)
        stopSpinning();
        showInfo('RED', 'ERROR');
        btnStop.disabled = true;
        btnRun.disabled = false;
    })
}

function killProcess() {
    if (pid != 0) {
        kill(pid, 'SIGKILL', function(err) {
            if (err) {
                console.log('Process Termination failed!');
                showInfo('green', 'Process Termination failed!');
            }
            else {
                stopSpinning();
                showInfo('RED', 'Process has Terminated');
                btnStop.disabled = true;
                btnRun.disabled = false;
            }
        });
    }
}

function showInfo(color, status) {
    var compileReult = document.getElementById("compile-reult");
    compileReult.innerHTML = status;
    compileReult.style.color = color;
    compileReult.style.display = "inline";
}

function stopSpinning() {
    document.getElementById("compile-result-spin").style.display = "none";
}

function inputCmdPreprocess(outfile) {
    var inputEditorFile = inputEditor.getSession().getValue();
    var strArray = inputEditorFile.split(" ");
    inputEditorFile = "";
    var i;
    for (i = 0; i < strArray.length; i++) {
        inputEditorFile += strArray[i];
        if (i != strArray.length-1) {
            inputEditorFile += " ";
        }
    }
    var inputEditorFile = remove_linebreaks(inputEditorFile);
    cliForMain = 'echo ' + inputEditorFile + ' | ' + outfile;
    console.log(cliForMain);
}

function remove_linebreaks( sss ) {
    return sss.replace( /[\r\n]+/gm, " " );
}

exports.compileCode = compileCode;
exports.killProcess = killProcess;
