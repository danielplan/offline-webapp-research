import ApiClient from '../cache/ApiClient';

const productApi = new ApiClient('http://localhost:3000/');

export function getProducts() {
    return productApi.get('product');
}

export function addProduct({ name, price }) {
    return productApi.post('product', { name, price });
}

export function updateProduct(id, { name, price }) {
    return productApi.put(`product/${id}`, { name, price });
}