import { Injectable } from '@angular/core';
const electron = (<any>window).require('electron');
import { EventEmitter } from '@angular/core';

@Injectable()
export class IpcService {
  processStdOut: EventEmitter<any> = new EventEmitter();

  constructor() { }

  sendStartApp(app) {
    const appStdoutChannel = `npmRun:stdout:${app.name}`;
    const appStderrChannel = `npmRun:stderr:${app.name}`;
    const appExitChannel = `npmRun:exit:${app.name}`;

    electron.ipcRenderer.on(appStdoutChannel, (event, args) => {
      this.processStdOut.emit({
        event,
        args,
      });
    });

    electron.ipcRenderer.on(appStderrChannel, (event, args) => {
      this.processStdOut.emit({
        event,
        args,
      });
    });

    electron.ipcRenderer.on(appExitChannel, (event, args) => {
      this.processStdOut.emit({
        event,
        args,
      });
    });

    electron.ipcRenderer.send('startApp', app);
  }

  sendStopApp(app) {
    electron.ipcRenderer.send('stopApp', app);

    const appStdoutChannel = `npmRun:stdout:${app.name}`;
    const appStderrChannel = `npmRun:stderr:${app.name}`;
    const appExitChannel = `npmRun:exit:${app.name}`;

    electron.ipcRenderer.removeAllListeners([appStdoutChannel, appStderrChannel, appExitChannel]);
  }

}
