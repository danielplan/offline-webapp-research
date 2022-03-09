import { Database } from 'sqlite3';

export class Db {
    private static instance: Db;
    readonly db: Database;

    protected constructor(private name: string) {
        this.db = new Database(name, (err) => {
            if (err) {
                console.log(err.message);
                throw (err);
            } else {
                console.log(`connected to ${name}`);
            }
        });
    }

    static get(): Db {
        if (!this.instance) {
            this.instance = new Db('dev.sqlite3');
        }
        return Db.instance;
    }

}
