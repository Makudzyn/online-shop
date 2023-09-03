import {$authHost} from "./index.js";

// Запрос на создание/добавление нового товара в корзину
export const addProductToCart = async (product) => {
  const {data} = await $authHost.post('api/cart/add', product);
  return data;
}

// Запрос на получение всех товаров из корзины
export const fetchCartProducts = async () => {
  const {data} = await $authHost.get(`api/cart`);
  return data;
}