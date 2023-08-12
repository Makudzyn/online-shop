const {Product, ProductInfo} = require("../models/models");
const path = require("path");
const uuid = require('uuid'); // Для генерации уникального ID, имени файла
const ApiError = require("../error/ApiError.js");

// Функция создания и добавления в БД нового товара
async function create(req, res, next) {
  try {
    let {name, price, brandId, typeId, info} = req.body; // Из тела запроса получаем нужные для создания поля
    const {img} = req.files; // Из запроса получаем файл, картинку товара
    let fileName = `${uuid.v4()}.jpg`; // Генерируем уникальное имя для файла
    await img.mv(path.resolve(__dirname, "..", 'static', fileName)); // Перемещаем файлы полученные от клиента в папку static

    const product = await Product.create(
      {name, price, brandId, typeId, img: fileName} // Создаем и добавляем товар в БД, айди будет присвоен автоматически
    );                                                     // Рейтинг не указываем, он по дефолту 0

    if (info) { // Если есть дополнительные характеристики
      info = JSON.parse(info); // Парсим, так как в из FormData получаем строку
      info.map(i => ProductInfo.create({ // Для каждого элемента массива создаем ProductInfo
        productId: product.id,
        title: i.title,
        description: i.description,
      }))
    }

    return res.json(product);
  } catch (e) {
    next(ApiError.internal(e.message)); // Если при создании произошла ошибка
  }
}

// Функция получения всех товаров
async function getAll(req, res) {
  let {typeId, brandId, limit, page} = req.query; // Получаем параметры из строки запроса
  page = page || 1; // Если страница не была задана - присваеваем 1
  limit = limit || 8; // Если лимит не был задан - присваеваем 10
  let offset = page * limit - limit; // Отступ для корректного отображения товаров по страницам
  let products;
  if (brandId && typeId) { // Если тип и бренд были заданы
    products = await Product.findAndCountAll({where: {typeId, brandId}, limit, offset});
  } else if (brandId && !typeId) { // Если задан только бренд
    products = await Product.findAndCountAll({where: {brandId}, limit, offset});
  } else if (!brandId && typeId) { // Если задан только тип
    products = await Product.findAndCountAll({where: {typeId}, limit, offset});
  } else { // Если тип и бренд не были заданы
    products = await Product.findAndCountAll({limit, offset});
  }
  return res.json(products);
}

// Функция получения товара по ID
async function getOne(req, res) {
  const {id} = req.params; // Из параметров получаем ID товара, который хотим получить
  const product = await Product.findOne(
    {
      where: {id},
      include: [{model: ProductInfo, as: "info"}] // Получаем массив характеристик
    }
  )
  return res.json(product);
}

// Функция удаления товара по ID
async function deleteOne(req, res, next) {
  const {id} = req.params; // Из параметров получаем ID товара, который нужно удалить
  try {
    const product = await Product.findOne({where: {id}}); // Находим товар
    if (!product) {
      return next(ApiError.notFound('Product not found')); // Если товар не найден возвращаем ошибку
    }
    await product.destroy(); // Удаляем товар
    return res.status(204).end(); // Возвращаем ответ с кодом 204 No Content
  } catch (e) {
    return next(ApiError.internal(e.message)); // Если не удалось удалить
  }
}

module.exports = {create, getAll, getOne, deleteOne}