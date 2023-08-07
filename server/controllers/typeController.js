const {Type} = require("../models/models.js");
const ApiError = require('../error/ApiError.js');

async function create(req, res) { // Функция создания и добавления нового типа
  const {name} = req.body; // Из тела запроса получаем название типа
  const type = await Type.create({name}); // Создаем и добавляем тип в БД, ID будет присвоен автоматически
  return res.json(type); // Возвращаем ответ в JSON формате
}
async function getAll(req, res) { // Функция получения всех типов
  const types = await Type.findAll(); // Получаем все существующие записи из таблицы типов
  return res.json(types); // Возвращаем ответ в JSON формате
}

async function deleteOne(req, res, next) { // Функция удаления типа по ID
  const {id} = req.params; // Из параметров получаем ID типа, который нужно удалить
  try {
    const type = (await Type.findOne({where: {id}})).destroy(); // Находим и удаляем тип, присваеваем результат в переменную
    if (!type) {
      return next(ApiError.notFound('Type not found'))  // Если тип не найден возвращаем ошибку
    }
    return res.json(type); // Возвращаем ответ в JSON формате
  } catch (e) {
    return next(ApiError.internal('Failed to delete type')) // Если не удалось удалить
  }
}

module.exports = {create, getAll, deleteOne}