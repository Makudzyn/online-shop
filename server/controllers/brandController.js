const ApiError = require("../error/ApiError.js")
const {Brand} = require("../models/models.js");

async function create(req, res) { // Функция создания и добавления нового бренда
  const {name} = req.body; // Из тела запроса получаем название бренда
  const brand = await Brand.create({name}); // Создаем и добавляем бренд в БД, айди будет присвоен автоматически
  return res.json(brand); // Возвращаем ответ в JSON формате
}
async function getAll(req, res) { // Функция получения всех брендов
  const brands = await Brand.findAll(); // Получаем все существующие записи из таблицы брендов
  return res.json(brands); // Возвращаем ответ в JSON формате
}

async function deleteOne(req, res, next) { // Функция удаления бренда по ID
  const {id} = req.params; // Из параметров получаем ID бренда, который нужно удалить
  try {
    const brand = (await Brand.findOne({where: {id}})).destroy(); // Находим и удаляем бренд, присваеваем результат в переменную
    if (!brand) {
      return next(ApiError.notFound('Brand not found')) // Если бренд не найден возвращаем ошибку
    }
    return res.json(brand); // Возвращаем ответ в JSON формате
  } catch (e) {
    return next(ApiError.internal('Failed to delete brand')) // Если не удалось удалить
  }
}

module.exports = {create, getAll, deleteOne}