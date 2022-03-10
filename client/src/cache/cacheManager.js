const VERSION = 1;
const DB_NAME = 'cache';
const DATA_STORE = 'data';
const BUFFER_STORE = 'buffer';

export default class CacheManager {
    db = null;
    constructor(id) {
        this.id = id;
        if (!('indexedDB' in window)) {
            console.log('Caching is not supported');
            return;
        }
    }

    getCache = async () => {
        if (!this.db) {
            return new Promise(resolve => {
                const request = window.indexedDB.open(`${DB_NAME}.${this.id}`, VERSION);
                request.onsuccess = e => {
                    this.db = e.target.result;
                    resolve(e.target.result);
                };
                request.onerror = e => {
                    console.log(e.target.result);
                };
                request.onupgradeneeded = e => {
                    const db = e.target.result;
                    db.createObjectStore(DATA_STORE, { keyPath: 'id', autoIncrement: false });
                    db.createObjectStore(BUFFER_STORE, { keyPath: 'id', autoIncrement: true });
                };
            });
        } else {
            return this.db;
        }
    }

    writeDataCache = async (id, data) => {
        const db = await this.getCache();
        return new Promise(resolve => {
            const trans = db.transaction(DATA_STORE, 'readwrite');
            trans.oncomplete = () => {
                resolve();
            };

            const store = trans.objectStore(DATA_STORE);
            const item = {
                id,
                data: JSON.stringify(data),
                timestamp: new Date().getTime()
            };
            store.put(item);
        });
    }

    readDataCache = async (id) => {
        const db = await this.getCache();
        return new Promise((resolve, reject) => {
            const trans = db.transaction(DATA_STORE, 'readonly');
            const store = trans.objectStore(DATA_STORE);
            const item = store.get(id);
            trans.oncomplete = () => {
                if (item.result) {
                    resolve(JSON.parse(item.result.data));
                } else {
                    reject('Nothing found')
                }
            };
        });
    }

    pushBufferData = async (url, method, data) => {
        const db = await this.getCache();
        return new Promise(resolve => {
            const trans = db.transaction(BUFFER_STORE, 'readwrite');
            trans.oncomplete = () => {
                resolve();
            };
            const store = trans.objectStore(BUFFER_STORE);
            const item = {
                data: JSON.stringify(data),
                url,
                method
            };
            store.add(item);
        });
    }
}
