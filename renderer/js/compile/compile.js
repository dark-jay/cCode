const cp = require("child_process");

const compiler = "g++";
const version = "-std=c++11";
const out = "-o";
const infile = currCodePathPure; //"main.cpp";
const outfile = currCodePathPure.substring(0, str.length-4); //"main"

let cliForMain = 'echo 3 1 2 3 jay | ' + outfile; // command line input for main.exe

// g++ -std=c++11 -o main main.cpp

function compileCode() {
    var compileProcess = cp.execFile(compiler, [version, out, outfile, infile], {shell: true}, (error, stdout, stderr)=>{
        if (error) {
            //console.log(`Name: ${error.name}\nMessage: ${error.message}\nStack: ${error.stack}`);
            throw error;
        }
        else {
            console.log('Compiled Successfull');
            runMain();
        }
    })
}

function runMain() {
    const main = cp.spawn('cmd.exe', ['/c', cliForMain]); // we can use .bat file instead of the 2nd of 2nd argument

    main.stdout.on('data', (data) => {
      //console.log(`Output:\n${data.toString()}`);
      codeEditor.setValue(data.toString(), 1);
    });

    main.stderr.on('data', (data) => {
      console.error(data.toString());
    });

    main.on('exit', (code) => {
      console.log(`main.exe exited with code ${code}`);
    });

    main.on("error", (err)=>{
        console.log(`Error running main: ${err}`)
    })
}

