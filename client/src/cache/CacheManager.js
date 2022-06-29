import Database from "./Database";

const DB_NAME = 'cache';
const DATA_STORE = 'data';
const BUFFER_STORE = 'buffer';

export default class CacheManager {

    constructor(id) {
        this.id = id;
        this.database = new Database(DB_NAME + '.' + this.id, [DATA_STORE, BUFFER_STORE]);
    }

    async writeDataCache(id, data) {
        const item = {
            id,
            data,
            timestamp: new Date().getTime()
        };
        return await this.database.create(item, DATA_STORE);
    }

    async readDataCache(id) {
        return this.database.get(id, DATA_STORE);
    }

    async pushBufferedRequest(url, method, data) {
        const item = {
            data,
            url,
            method
        };
        return await this.database.create(item, BUFFER_STORE)
    }

    async getBufferedRequests() {
        return await this.database.getAll(BUFFER_STORE);
    }

    async removeBufferedRequest(id) {
        return await this.database.delete(id, BUFFER_STORE);
    }
}