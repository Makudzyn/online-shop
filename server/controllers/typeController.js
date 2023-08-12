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
    const type = await Type.findOne({where: {id}}); // Находим тип
    if (!type) {
      return next(ApiError.notFound('Type not found'));  // Если тип не найден возвращаем ошибку
    }
    await type.destroy(); // Удаляем тип
    return res.status(204).end(); // Возвращаем ответ с кодом 204 No Content
  } catch (e) {
    return next(ApiError.internal(e.message)) // Если не удалось удалить
  }
}

// Функция обновления типа по ID
async function update(req, res, next) {
  const {id} = req.params; // Из параметров получаем ID типа, который нужно обновить
  const {name} = req.body; // Из тела запроса получаем новое название типа
  try {
    const type = await Type.findOne({where:{id}}); // Находим тип
    if (!type) {
      return next(ApiError.notFound('Type not found')); // Если тип не найден, возвращаем ошибку
    }
    type.name = name; // Обновляем название типа
    await type.save(); // Сохраняем обновленные данные
    return res.json(type); // Возвращаем обновленный тип
  } catch (e) {
    return next(ApiError.internal(e.message)); // Если не удалось обновить
  }
}

module.exports = {create, getAll, deleteOne, update}