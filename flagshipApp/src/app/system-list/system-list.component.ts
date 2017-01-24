import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
const PouchDB = require('pouchdb');
const electron = (<any>window).require('electron');

import { System } from '../system';
import { DatabaseService } from '../database.service';
import { IpcService } from '../ipc.service';

@Component({
  selector: 'app-system-list',
  templateUrl: './system-list.component.html',
  styleUrls: ['./system-list.component.css']
})
export class SystemListComponent implements OnInit, OnDestroy {

  systems: System[] = [];
  db: any;

  constructor(
    private database: DatabaseService,
    private ipc: IpcService,
  ) { }

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
    app.runing = true;

    this.ipc.sendStartApp(app);
  }

  stopApp(app) {
    app.runing = false;

    this.ipc.sendStopApp(app);
  }

  load() {
    this.database.getAllSystems()
      .then(docs => {        
        this.systems = docs.rows.map(row => row.doc);
      });
  }

  ngOnInit() {
    this.load();

    this.ipc.processStdOut.subscribe(eventObj => {
      console.log(eventObj);
    });
  }

  ngOnDestroy() {
    this.ipc.processStdOut.unsubscribe();
  }
}
