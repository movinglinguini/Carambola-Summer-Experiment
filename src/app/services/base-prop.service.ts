import * as _PouchDB from 'pouchdb';

const PouchDB = (_PouchDB as any).default;

/**
 * Base service intended for handling anything that is a prop in the game:
 * advisors, actions, affinities, etc.
 *
 * Anything that ought to be stored for future use is a prop.
 */
export class BasePropService {

  protected _db: PouchDB.Database;
  protected _indices: string[] = [];

  constructor(protected _dbname: string) {
    this.startDB();
  }

  protected async clearTable() {
    const docs = (await this._db.allDocs({
      include_docs: true,
    })).rows.map(r => (r.doc as any));

    this._db.bulkDocs(docs.map(doc => ({...doc, _deleted: true })));
  }

  private async startDB() {
    this._db = new PouchDB(this._dbname);
  }
}
