import ApiClient from '../cache/apiClient';

const productApi = new ApiClient('http://localhost:3000/', 'sync');

export const getProducts = () => {
    return productApi.get('product');
}

export const addProduct = ({ name, price }) => {
    return productApi.post('product', { name, price });
}

export const updateProduct = (id, { name, price }) => {
    return productApi.put(`product/${id}`, { name, price });
}