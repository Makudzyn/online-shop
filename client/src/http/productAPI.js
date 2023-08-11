import {$authHost, $host} from "./index.js";

// Запрос на создание/добавление нового типа
export const createType = async (type) => {
  const {data} = await $authHost.post('api/type', type);
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