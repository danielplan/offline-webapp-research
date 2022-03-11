import CacheManager from "./cacheManager";

export default class ApiClient {

    static init = false;

    constructor(baseUrl, totalSynchEndpoint, fetchOptions) {
        this.baseUrl = baseUrl;
        this.cacheManager = new CacheManager(baseUrl);
        this.fetchOptions = fetchOptions;
        this.totalSynchEndpoint = totalSynchEndpoint;
        if (!ApiClient.init) {
            window.addEventListener("online", () => {
                localStorage.setItem("online", 1);
            });
            window.addEventListener("offline", () => {
                localStorage.setItem("online", 0);
            });
            localStorage.setItem("online", window.navigator.onLine ? 1 : 0);
            ApiClient.init = true;
        }
    }


    isOnline = () => localStorage.getItem('online') == 1;

    /**
     * Perform a GET request
     * 
     * @param {string} path routing endpoint
     * @param {RequestInit} options fetch options
     */
    get = async (path, options) => {
        if (this.isOnline()) {
            try {
                const result = await fetch(`${this.baseUrl}${path}`, {
                    ...this.fetchOptions,
                    ...options
                });
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

    /**
     * Perform a POST request
     * 
     * @param {string} path routing endpoint
     * @param {Object} payload data to be posted
     * @param {string} synchOptions.key key for api endpoint that allows multiple synchronizations
     * @param {string} synchOptions.endpoint endpoint of api that allows multiple records to be posted
     * @param {RequestInit} options fetch options
     */
    post = async (path, payload, synchOptions, options) => {
        console.log(payload);
        if (this.isOnline()) {
            try {
                const result = await fetch(`${this.baseUrl}${path}`, {
                    ...this.fetchOptions,
                    method: 'POST',
                    body: JSON.stringify(payload),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    ...options
                });
                if (result.ok) {
                    const data = await result.json();
                    return data;
                }
            } catch {
                //do nothing
            }
        }
        if (synchOptions.key && this.totalSynchEndpoint) {
            await this.cacheManager.writeSynchData(`${this.baseUrl}${this.totalSynchEndpoint}`, 'POST', payload, synchOptions.key, true);
        } else if (synchOptions.endpoint) {
            await this.cacheManager.writeSynchData(`${this.baseUrl}${synchOptions.endpoint}`, 'POST', payload, synchOptions.endpoint, false);
        } else {
            await this.cacheManager.pushBufferData(`${this.baseUrl}${path}`, 'POST', payload);
        }
    }

    put = async (path, payload) => {
        if (this.isOnline()) {
            try {
                const result = await fetch(`${this.baseUrl}${path}`, {
                    method: 'PUT',
                    body: JSON.stringify(payload),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
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
    }


}