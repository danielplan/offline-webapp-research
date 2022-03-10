import CacheManager from "./cacheManager";

export default class ApiClient {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.cacheManager = new CacheManager(baseUrl);
    }


    isOnline = () => localStorage.getItem('online') == 1;
    get = async (path) => {
        if (this.isOnline()) {
            try {
                const result = await fetch(`${this.baseUrl}${path}`);
                if (result.ok) {
                    const data = await result.json();
                    this.cacheManager.writeDataCache(path, data);
                    return data;
                }
            } catch {
                //do nothing
            }
        }
        return this.cacheManager.readDataCache(path);
    }

    post = async (path, payload) => {
        if (this.isOnline()) {
            try {
                const result = await fetch(`${this.baseUrl}${path}`, {
                    method: 'POST',
                    body: payload
                });
                if (result.ok) {
                    const data = await result.json();
                    return data;
                }
            } catch {
                //do nothing
            }
        }
        await this.cacheManager.pushBufferData(`${this.baseUrl}${path}`, 'POST', payload);
        return true;
    }

    put = async (path, payload) => {
        if (this.isOnline()) {
            try {
                const result = await fetch(`${this.baseUrl}${path}`, {
                    method: 'PUT',
                    body: payload
                });
                if (result.ok) {
                    const data = await result.json();
                    return data;
                }
            } catch {
                //do nothing
            }
        }
        await this.cacheManager.pushBufferData(`${this.baseUrl}${path}`, 'PUT', payload);
        return true;
    }
}