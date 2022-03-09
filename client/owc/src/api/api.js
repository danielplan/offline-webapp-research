const baseUrl = 'http://localhost:3000/'

export const get = async (path) => {
    const result = await (await fetch(`${baseUrl}${path}`)).json();
    return result.body;
}

export const post = async (path, payload) => {
    const result = await (await fetch(`${baseUrl}${path}`, {
        method: 'POST',
        body: payload
    })).json();
    return result.body;
}

export const put = async (path, payload) => {
    const result = await (await fetch(`${baseUrl}${path}`, {
        method: 'PUT',
        body: payload
    })).json();
    return result.body;
}