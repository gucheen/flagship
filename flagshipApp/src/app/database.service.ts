import { Injectable } from '@angular/core';
import * as PouchDB from 'pouchdb';
import { System } from './system';

@Injectable()
export class DatabaseService {
  db: any;

  constructor() {
    this.db = new PouchDB('flagship');
  }

  addSystem(newSystem: System): Promise<any> {
    return this.db.post(newSystem)
      .then(doc => {
        return Promise.resolve(Object.assign({}, newSystem, {
          _id: doc.id,
          _rev: doc.rev,
        }));
      });
  }

  updateSystem(system: System): Promise<any> {
    return this.db.put(system)
      .then(doc => {
        return Promise.resolve(Object.assign({}, system, {
          _rev: doc.rev,
        }));
      });
  }

  deleteSystem(system: System): Promise<any> {
    return this.db.remove(system);
  }

  getAllSystems() {
    return this.db.allDocs({
      include_docs: true,
    });
  }

  getSystem(id) {
    return this.db.get(id)
      .then(doc => {
        return doc;
      });
  }

}
