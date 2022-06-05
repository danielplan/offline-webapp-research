export default class CacheDatabase {
    constructor(name, storeNames) {
        this.params = {
            name,
            stores: storeNames.map((name) => ({ name, keyPath: 'id', autoIncrement: true })),
            version: 1
        }
        if (!('indexedDB' in window)) {
            console.error('Database not supported');
            return;
        }
    }
    async _getDB({ name, stores, version }) {
        if (this.db != undefined)
            return this.db;
        return new Promise((resolve) => {
            const request = window.indexedDB.open(name, version);
            request.onsuccess = (e) => {
                if (e.target && e.target.result) {
                    this.db = e.target.result;
                    resolve(e.target.result);
                }
            }
            request.onupgradeneeded = (e) => {
                const db = e.target.result;
                stores.forEach(element => {
                    db.createObjectStore(element.name, element);
                });
            }
        });
    }

    async getAll(store) {
        const db = await this._getDB(this.params);
        return new Promise((resolve, reject) => {
            if (db === null) {
                reject('No Database found');
            } else {
                const trans = db.transaction(store, 'readonly').objectStore(store);
                const request = trans.getAll();
                request.onsuccess = () => {
                    if (request.result) {
                        resolve(request.result);
                    } else {
                        reject('Nothing found');
                    }
                };
            }
        });
    }

    async create(item, store) {
        const db = await this._getDB(this.params);

        return new Promise((resolve, reject) => {
            const trans = db.transaction(store, 'readwrite').objectStore(store);
            const request = trans.put(item);
            request.onsuccess = () => {
                resolve(item);
            }
            request.onerror = () => {
                reject('Could not create item in database');
            }
        });
    }

    async delete(id, store) {
        const db = await this._getDB(this.params);

        return new Promise((resolve, reject) => {
            const trans = db.transaction(store, 'readwrite').objectStore(store);
            const request = trans.delete(id);
            request.onsuccess = () => {
                resolve(true);
            }
            request.onerror = () => {
                reject('Item not found');
            }
        });
    }

    async get(id, store) {
        const db = await this._getDB(this.params);
        return new Promise((resolve, reject) => {
            const trans = db.transaction(store, 'readonly').objectStore(store);
            const request = trans.get(id)
            request.onsuccess = () => {
                if (request.result) {
                    resolve(request.result);
                } else {
                    reject('Item not found');
                }
            }
            request.onerror = () => {
                reject('Item not found');
            }
        });
    }
}