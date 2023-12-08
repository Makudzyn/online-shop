const ApiError = require("../error/ApiError.js")
const {CartProduct} = require("../models/models");

// Функция добавления нового товара в корзину
async function addToCart(req, res, next) {
  let {cartId, productId} = req.body;
  try {
    const existingCartItem = await CartProduct.findOne({where: {cartId, productId}}); // Проверяем, есть ли уже такой товар в корзине для данной пары cartId и productId

    if (existingCartItem) { // Если товар уже есть в корзине, обновляем количество
      existingCartItem.quantity++;
      await existingCartItem.save();
      return res.json(existingCartItem);
    } else {
      const cartProduct = await CartProduct.create({cartId, productId, quantity: 1}); //Если товара нет в корзине, добавляем его
      return res.json(cartProduct);
    }
  } catch (error) {
    return next(ApiError.internal('Unable to add product to cart'));
  }
}


// Функция получения всех товаров в корзине
async function getAllCartProducts(req, res) {
  const cartProducts = await CartProduct.findAll(); // Получаем все существующие записи из таблицы брендов
  return res.json(cartProducts);
}

// Функция удаления товара из корзины
async function removeCartProduct(req, res, next) {
  const {id} = req.params; // Из параметров получаем ID товара, который нужно удалить
  try {
    const cartProduct = await CartProduct.findOne({where: {id}}); // Находим товар
    if (!cartProduct) {
      return next(ApiError.notFound('Cart product not found')) // Если товар не найден возвращаем ошибку
    }
    await cartProduct.destroy(); // Удаляем товар из корзины
    return res.status(204).end(); // Возвращаем ответ с кодом 204 No Content
  } catch (e) {
    return next(ApiError.internal(e.message)) // Если не удалось удалить
  }
}



module.exports = {addToCart, getAllCartProducts, removeCartProduct}