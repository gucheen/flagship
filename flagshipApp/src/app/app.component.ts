import {
  Component,
} from '@angular/core';
const PouchDB = require('pouchdb');

import { System } from './system';
import { DatabaseService } from './database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
}
