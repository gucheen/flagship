import {
  Component,
  OnInit
} from '@angular/core';
const PouchDB = require('pouchdb');
import { System } from './system';
import { DatabaseService } from './database.service';
const electron = (<any>window).require('electron');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  systems: System[] = [];
  db: any;

  constructor(
    private database: DatabaseService
  ) { }

  addSystem(newSystem: System = {
    name: 'Fin',
    apps: [
      {
        name: 'fin_fe',
        description: 'fin_fe',
        location: '/Users/gucheng/Documents/workspace/app/fin_ops_fe',
        script: 'npm start',
      },
      {
        name: 'silencer_fin',
        description: 'silencer_fin',
        location: '/Users/gucheng/Documents/workspace/app/silencer',
        script: 'npm run fin',
      },
    ],
  }) {
    this.database.addSystem(newSystem)
      .then(result => {
        this.systems.push(result);
      });
  }

  updateSystem(system: System) {
    this.database.updateSystem(system)
      .then(doc => {
        console.log(doc);

        Object.assign(system, doc);
      });
  }

  deleteSystem(system: System, index: number) {
    this.database.deleteSystem(system)
      .then(() => {
        this.systems.splice(index, 1);
      });
  }

  toggleApp(app) {
    if (app.runing) {
      return this.stopApp(app);
    }
    return this.startApp(app);
  }

  startApp(app) {
    electron.ipcRenderer.send('startApp', app);

    app.runing = true;

    electron.ipcRenderer.on(`npmRun:stdout:${app.name}`, (event, args) => {
      console.log(event, args);
    });

    electron.ipcRenderer.on(`npmRun:stderr:${app.name}`, (event, args) => {
      console.log(event, args);
    });

    electron.ipcRenderer.on(`npmRun:exit:${app.name}`, (event, args) => {
      console.log(event, args);
    });
  }

  stopApp(app) {
    electron.ipcRenderer.send('stopApp', app);

    app.runing = false;
  }

  load() {
    this.database.getAllSystems()
      .then(docs => {
        this.systems = docs.rows.map(row => row.doc);
      });
  }

  ngOnInit() {
    this.load();
  }
}
