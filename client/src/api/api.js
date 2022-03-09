const baseUrl = 'http://localhost:3000/';
const cachedPrefix = 'cache';

export const get = async (path) => {
    if (isOnline()) {
        const result = await fetch(`${baseUrl}${path}`);
        if (result.ok) {
            const data = await result.json();
            setCached(path, 'get', data);
            return data;
        }
    }
    return getCached(path, 'get');
}

export const post = async (path, payload) => {
    if (isOnline()) {
        const result = await fetch(`${baseUrl}${path}`, {
            method: 'POST',
            body: payload
        });
        if (result.ok) {
            const data = await result.json();
            setCached(path, 'post', data);
        }
    }
}

export const put = async (path, payload) => {
    if (isOnline()) {
        const result = await fetch(`${baseUrl}${path}`, {
            method: 'PUT',
            body: payload
        });
        if (result.ok) {
            const data = await result.json();
            setCached(path, 'put', data);
        }
    }
}

const isOnline = () => localStorage.getItem('online') == 1;
const getCached = (path, method) => JSON.parse(localStorage.getItem(`${cachedPrefix}.${method}.${path}`));
const setCached = (path, method, data) => {
    //TODO: what cache post/put
    localStorage.setItem(`${cachedPrefix}.${method}.${path}`, JSON.stringify(data));
}