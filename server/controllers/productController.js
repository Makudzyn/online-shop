const {Product, ProductInfo} = require("../models/models");
const path = require("path");
const uuid = require('uuid'); // Для генерации уникального ID, имени файла
const ApiError = require("../error/ApiError.js");

async function create(req, res, next) { // Функция создания и добавления нового товара
  try {
    let {name, price, brandId, typeId, info} = req.body; // Из тела запроса получаем нужные для создания поля
    const {img} = req.files; // Из запроса получаем файл, картинку товаров
    let fileName = `${uuid.v4()}.jpg`; // Генерируем уникальное имя для файла
    await img.mv(path.resolve(__dirname, "..", 'static', fileName)); // Перемещаем файлы полученные от клиента в папку static

    const product = await Product.create(
      {name, price, brandId, typeId, img: fileName} // Создаем и добавляем товар в БД, айди будет присвоен автоматически
    );                                                     // Рейтинг не указываем, он по дефолту 0

    if (info) {
      info = JSON.parse(info);
      info.map(i => ProductInfo.create({
        deviceId: i.deviceId,
        title: i.title,
        description: i.description,
      }))
    }

    return res.json(product);
  } catch (e) {
    next(ApiError.internal(e.message));
  }
}
async function getAll(req, res) { // Функция получения всех товаров
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
  return res.json(products); // Возвращаем ответ в JSON формате
}

async function getOne(req, res) { // Функция получения товара по ID
  const {id} = req.params; // Из параметров получаем ID товара, который хотим получить
  const product = await Product.findOne(
    {
      where: {id},
      include: [{model: ProductInfo, as: "info"}]
    }
  )
  return res.json(product); // Возвращаем ответ в JSON формате
}

async function deleteOne(req, res, next) { // Функция удаления товара по ID
  const {id} = req.params; // Из параметров получаем ID товара, который нужно удалить
  try {
    const product = (await Product.findOne({where: {id}})).destroy(); // Находим и удаляем товар, присваеваем результат в переменную
    if (!product) {
      return next(ApiError.notFound('Product not found')); // Если товар не найден возвращаем ошибку
    }
    return res.json(product); // Возвращаем ответ в JSON формате
  } catch (e) {
    return next(ApiError.internal('Failed to delete product')); // Если не удалось удалить
  }
}

module.exports = {create, getAll, getOne, deleteOne}