import {$authHost, $host} from "./index.js";

// Запрос на создание/добавление нового типа
export const createType = async (type) => {
  const {data} = await $authHost.post('api/type', type);
  return data;
}

// Запрос на изменение типа
export const updateType = async (id, updatedType) => {
  const {data} = await $authHost.put(`api/type/${id}`, updatedType);
  return data;
}

// Запрос на удаление типа
export const deleteType = async (id) => {
  const {data} = await $authHost.delete(`api/type/${id}`);
  return data;
}
// Запрос на получение всех типов
export const fetchTypes = async () => {
  const {data} = await $host.get('api/type');
  return data;
}

// Запрос на создание/добавление нового бренда
export const createBrand = async (brand) => {
  const {data} = await $authHost.post('api/brand', brand);
  return data;
}
// Запрос на изменение бренда
export const updateBrand = async (id, updatedBrand) => {
  const {data} = await $authHost.put(`api/brand/${id}`, updatedBrand);
  return data;
}
// Запрос на удаление бренда
export const deleteBrand = async (id) => {
  const {data} = await $authHost.delete(`api/brand/${id}`);
  return data;
}
// Запрос на получение всех брендов
export const fetchBrands = async () => {
  const {data} = await $host.get('api/brand');
  return data;
}

// Запрос на создание/добавление нового товара
export const createProduct = async (product) => {
  const {data} = await $authHost.post('api/product', product);
  return data;
}
// Запрос на изменение товара
export const updateProduct = async (id, updatedProduct) => {
  const {data} = await $authHost.put(`api/product/${id}`, updatedProduct);
  return data;
}
// Запрос на удаление товара
export const deleteProduct = async (id) => {
  const {data} = await $authHost.delete(`api/product/${id}`);
  return data;
}
// Запрос на получение всех товаров
export const fetchProducts = async (typeId, brandId, page, limit) => {
  const {data} = await $host.get('api/product', {params: {
    typeId, brandId, page, limit
  }});
  return data;
}
// Запрос на получение конкретного товара по ID
export const fetchOneProduct = async (id) => {
  const {data} = await $host.get(`api/product/${id}`);
  return data;
}