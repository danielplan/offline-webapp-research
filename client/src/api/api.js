import { writeDataCache, readDataCache, pushBufferData } from "../cache/db";

const baseUrl = 'http://localhost:3000/';

export const get = async (path) => {
    if (isOnline()) {
        try {
            const result = await fetch(`${baseUrl}${path}`);
            if (result.ok) {
                const data = await result.json();
                writeDataCache(path, data);
                return data;
            }
        } catch {
            return readDataCache(path);
        }
    }
    return readDataCache(path);
}

export const post = async (path, payload) => {
    if (isOnline()) {
        try {
            const result = await fetch(`${baseUrl}${path}`, {
                method: 'POST',
                body: payload
            });
            if (result.ok) {
                const data = await result.json();
                return data;
            }
        } catch {
            await pushBufferData(`${baseUrl}${path}`, 'POST', payload);
            return true;
        }
    }
    await pushBufferData(`${baseUrl}${path}`, 'POST', payload);
    return true;
}

export const put = async (path, payload) => {
    if (isOnline()) {
        try {
            const result = await fetch(`${baseUrl}${path}`, {
                method: 'PUT',
                body: payload
            });
            if (result.ok) {
                const data = await result.json();
                return data;
            }
        } catch {
            await pushBufferData(`${baseUrl}${path}`, 'PUT', payload);
            return true;
        }
    }
    await pushBufferData(`${baseUrl}${path}`, 'PUT', payload);
    return true;
}


const isOnline = () => localStorage.getItem('online') == 1;