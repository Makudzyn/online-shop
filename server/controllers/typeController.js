const {Type} = require("../models/models.js");
const ApiError = require('../error/ApiError.js');

// Функция создания и добавления нового типа
async function create(req, res) {
  const {name} = req.body; // Из тела запроса получаем название типа
  const type = await Type.create({name}); // Создаем и добавляем тип в БД, ID будет присвоен автоматически
  return res.json(type);
}

// Функция получения всех типов
async function getAll(req, res) {
  const types = await Type.findAll(); // Получаем все существующие записи из таблицы типов
  return res.json(types);
}

// Функция удаления типа по ID
async function deleteOne(req, res, next) {
  const {id} = req.params; // Из параметров получаем ID типа, который нужно удалить
  try {
    const type = (await Type.findOne({where: {id}})).destroy(); // Находим и удаляем тип, присваеваем результат в переменную
    if (!type) {
      return next(ApiError.notFound('Type not found'))  // Если тип не найден возвращаем ошибку
    }
    return res.json(type);
  } catch (e) {
    return next(ApiError.internal(e.message)) // Если не удалось удалить
  }
}

module.exports = {create, getAll, deleteOne}