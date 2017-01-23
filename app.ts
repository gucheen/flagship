const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;
const spawn = require('child_process').spawn;

import ConfigManager from './config';

class App {
    private configManager = new ConfigManager();
    mainWindow: any;
    appSpawn: any = {};

    constructor() {
    }

    init() {
        // Create the browser window.
        this.mainWindow = new BrowserWindow({ width: 800, height: 600 })

        // and load the index.html of the app.
        this.mainWindow.loadURL('http://localhost:4200/')

        // Open the DevTools.
        this.mainWindow.webContents.openDevTools()

        // Emitted when the window is closed.
        this.mainWindow.on('closed', function () {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            this.mainWindow = null
        });

        ipcMain.on('startApp', (event, arg) => {
            console.log(arg);
            try {
                process.chdir(arg.location);
                const cmd = arg.script.split(' ');

                this.appSpawn[arg.name] = spawn(cmd[0], cmd.slice(1));

                this.appSpawn[arg.name].stdout.on('data', (data) => {
                    console.log(`stdout: ${data}`);
                    event.sender.send(`npmRun:stdout:${arg.name}`, data.toString());
                });

                this.appSpawn[arg.name].stderr.on('data', (data) => {
                    console.log(`stderr: ${data}`);
                    event.sender.send(`npmRun:stderr:${arg.name}`, data.toString());
                });

                this.appSpawn[arg.name].on('close', (code) => {
                    console.log(`child process exited with code ${code}`);
                    event.sender.send(`npmRun:exit:${arg.name}`, code);
                });
            } catch(error) {
                console.error(error);
            }
        });

        ipcMain.on('stopApp', (event, arg) => {
            try {
                this.appSpawn[arg.name].kill();
            } catch(error) {
                console.error(error);
            }
        });

        this.configManager.initialCheck();
    }
}

export default App;
