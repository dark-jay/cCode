// Modules
const {app, BrowserWindow, ipcMain} = require('electron')
const fs = require('fs');
const windowStateKeeper = require('electron-window-state')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// Create a new BrowserWindow when `app` is ready
function createWindow () {

    // window state keeper
    let state = windowStateKeeper({
      defaultWidth: 800, defaultHeight: 600
    })

    mainWindow = new BrowserWindow({
      x: state.x, y: state.y,
      width: state.width, height: state.height,
      minWidth: 400, minHeight: 300,
      webPreferences: { 
        nodeIntegration: true,
        enableRemoteModule: true
      },
      frame: false
    })

    // Load index.html into the new BrowserWindow
    mainWindow.loadFile('renderer/main.html')

    state.manage(mainWindow)

    // Open DevTools - Remove for PRODUCTION!
    mainWindow.webContents.openDevTools();

    // Listen for window being closed
    mainWindow.on('closed',  () => {
      mainWindow = null
    })
}

/*
// ipc code
ipcMain.on('openFile', (e, path)=> {
    console.log('Open FIle Begins');
    const {dialog} = require('electron') 
    dialog.showOpenDialog(function (fileNames) { 
      console.log('Inside FIle Begins');
        // fileNames is an array that contains all the selected 
        if(fileNames === undefined) { 
            console.log("No file selected"); 
        
        } else { 
            console.log(fileNames[0]);
            //e.sender.send('filePath', fileNames[0]) ;
        } 
    });
})
*/

// Electron `app` is ready
app.on('ready', createWindow)

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
    if (mainWindow === null) createWindow()
})
