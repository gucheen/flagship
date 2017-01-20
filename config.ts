const os = require('os');
const spawn = require('child_process').spawn;
const fs = require('fs');

class ConfigManager {
    private homePath = os.homedir();
    private configDirPath = `${this.homePath}/.flagship`;
    private configFilePath = `${this.configDirPath}/config.json`;

    createDir() {
        fs.exists(this.configDirPath, (exists) => {
            if (exists) {
                console.log('FlagShip configuration directory already exists.');
                return;
            }
            fs.mkdir(this.configDirPath);
        });
    }

    createFile() {
        fs.exists(this.configFilePath, (exists) => {
            if (exists) {
                console.log('FlagShip configuration file already exists.');
                return;
            }
            fs.writeFile(this.configFilePath);
        });
    }

    initialCheck() {
        this.createDir();
        this.createFile();
    }
}

export default ConfigManager;
