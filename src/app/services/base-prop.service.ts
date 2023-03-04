import { Injectable } from '@angular/core';
import * as PouchDB from 'pouchdb';


/**
 * Base service intended for handling anything that is a prop in the game:
 * advisors, actions, affinities, etc.
 *
 * Anything that ought to be stored for future use is a prop.
 */
@Injectable({
  providedIn: 'root'
})
export class BasePropService {

  protected _db: PouchDB.Database;
  protected _dbname: string;
  protected _indices: string[] = [];

  constructor() {
    this._db = new PouchDB(this._dbname);
  }
}
