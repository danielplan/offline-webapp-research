import { get, post, put } from "./api"

export const getProducts = () => {
    return get('product');
}

export const addProduct = ({ name, price }) => {
    return post('product', { name, price });
}

export const updateProduct = (id, { name, price }) => {
    return put('product', { name, price, id });
}