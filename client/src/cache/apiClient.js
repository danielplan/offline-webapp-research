import CacheManager from "./cacheManager";

export default class ApiClient {
    static {
        window.addEventListener("online", () => {
            localStorage.setItem("online", 1);
        });
        window.addEventListener("offline", () => {
            localStorage.setItem("online", 0);
        });
        localStorage.setItem("online", window.navigator.onLine ? 1 : 0);
    }

    /**
     * Perform a POST request
     * 
     * @param {string} baseurl base url used, e.g. https://localhost:3000/
     * @param {string} synchEndpoint 
     * @param {RequestInit} options default options
     */
    constructor(baseUrl, bulkEndpoint, fetchOptions) {
        this.baseUrl = baseUrl;
        this.cacheManager = new CacheManager(baseUrl);
        this.fetchOptions = fetchOptions;
        this.bulkEndpoint = bulkEndpoint;
        this.synchUp();
        window.addEventListener("online", () => this.synchUp);
    }


    isOnline = () => localStorage.getItem('online') == 1;


    _request = async (path, options, payload, method) => {
        if (this.isOnline()) {
            try {
                const result = await fetch(`${this.baseUrl}${path}`, {
                    ...this.fetchOptions,
                    method,
                    body: payload ? JSON.stringify(payload) : undefined,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        ...this.fetchOptions?.headers,
                        ...options?.headers,
                    },
                    ...options
                });
                if (result.ok) {
                    return await result.json();
                }
            } catch {
                //do nothing
            }
        }
        await this.cacheManager.pushBufferedRequest(`${this.baseUrl}${path}`, method, payload);
    }


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
     * @param {Object} payload request payload
     * @param {RequestInit} options fetch options
     */
    post = async (path, payload, options) => {
        return this._request(path, options, payload, 'POST');
    }

    /**
     * Perform a PUT request
     * 
     * @param {string} path routing endpoint
     * @param {Object} payload request payload
     * @param {RequestInit} options fetch options
     */
    put = async (path, payload, options) => {
        return this._request(path, options, payload, 'PUT');
    }

    /**
     * Perform a PATCH request
     * 
     * @param {string} path routing endpoint
     * @param {Object} payload request payload
     * @param {RequestInit} options fetch options
     */
    patch = async (path, payload, options) => {
        return this._request(path, options, payload, 'PATCH');
    }

    /**
     * Perform a DELETE request
     * 
     * @param {string} path routing endpoint
     * @param {Object} payload request payload
     * @param {RequestInit} options fetch options
     */
    delete = async (path, payload, options) => {
        return this._request(path, options, payload, 'DELETE');
    }

    synchUp = async () => {
        const requests = await this.cacheManager.getBufferedRequests();
        if (requests && requests.length) {
            if (this.bulkEndpoint) {
                try {
                    const result = await fetch(`${this.baseUrl}${this.bulkEndpoint}`, {
                        ...this.fetchOptions,
                        method: 'POST',
                        body: JSON.stringify(requests),
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            ...this.fetchOptions?.headers,
                        }
                    });
                    if (result.ok) {
                        const response = await result.json();
                        response.result.forEach(async (id) => {
                            await this.cacheManager.removeBufferedRequest(id);
                        });
                    }
                } catch {
                    console.error('Could not synch: request failed');
                }
            } else {
                requests.forEach(async (request) => {
                    try {
                        const result = await fetch(request.url, {
                            ...this.fetchOptions,
                            method: request.method,
                            body: JSON.stringify(request.data),
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                ...this.fetchOptions?.headers,
                            }
                        });
                        if (result.ok) {
                            await this.cacheManager.removeBufferedRequest(request.id);
                        }
                    } catch {
                        //skip
                    }
                });
            }
        }
    }
}