const cp = require("child_process");

let cliForMain = "";

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
            //console.log(`Name: ${error.name}\nMessage: ${error.message}\nStack: ${error.stack}`);
            //throw error;
            outputEditor.setValue(`Name: ${error.name}\nMessage: ${error.message}`.toString(), 1);
        }
        else {
            console.log('Compile Successfull');
            runMain();
        }
    });
}

function runMain() {
    const main = cp.spawn('cmd.exe', ['/c', cliForMain]); // we can use .bat file instead of the 2nd of 2nd argument

    main.stdout.on('data', (data) => {
        //console.log(`Output:\n${data.toString()}`);
        outputEditor.setValue(data.toString(), 1);
    });

    main.stderr.on('data', (data) => {
        console.error(data.toString());
        showInfo('red', 'RUNTIME ERROR');
    });

    main.on('exit', (code) => {
        console.log(`main.exe exited with code ${code}`);
        showInfo('green', 'SUCCESS');
    });

    main.on("error", (err)=>{
        console.log(`Error running main: ${err}`)
        showInfo('RED', 'ERROR');
    })
}

function showInfo(color, status) {
    document.getElementById("compile-result-spin").style.display = "none";
    var compileReult = document.getElementById("compile-reult");
    compileReult.innerHTML = status;
    compileReult.style.color = color;
    compileReult.style.display = "inline";
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
