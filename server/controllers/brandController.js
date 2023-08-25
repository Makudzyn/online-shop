const ApiError = require("../error/ApiError.js")
const {Brand} = require("../models/models.js");

// Функция создания и добавления нового бренда
async function create(req, res) {
  const {name} = req.body; // Из тела запроса получаем название бренда
  const brand = await Brand.create({name}); // Создаем и добавляем бренд в БД, айди будет присвоен автоматически
  return res.json(brand);
}

// Функция получения всех брендов
async function getAll(req, res) {
  const brands = await Brand.findAll(); // Получаем все существующие записи из таблицы брендов
  return res.json(brands);
}

// Функция удаления бренда по ID
async function deleteOne(req, res, next) {
  const {id} = req.params; // Из параметров получаем ID бренда, который нужно удалить
  try {
    const brand = await Brand.findOne({where: {id}}); // Находим бренд
    if (!brand) {
      return next(ApiError.notFound('Brand not found')) // Если бренд не найден возвращаем ошибку
    }
    await brand.destroy(); // Удаляем бренд
    return res.status(204).end(); // Возвращаем ответ с кодом 204 No Content
  } catch (e) {
    return next(ApiError.internal(e.message)) // Если не удалось удалить
  }
}

// Функция обновления бренда по ID
async function update(req, res, next) {
  const {id} = req.params; // Из параметров получаем ID бренда, который нужно обновить
  const {name} = req.body; // Из тела запроса получаем новое название бренда
  try {
    const brand = await Brand.findOne({where:{id}}); // Находим бренд
    if (!brand) {
      return next(ApiError.notFound('Type not found')); // Если бренда не найден, возвращаем ошибку
    }
    brand.name = name; // Обновляем название бренда
    await brand.save(); // Сохраняем обновленные данные
    return res.json(brand); // Возвращаем обновленный бренда
  } catch (e) {
    return next(ApiError.internal(e.message)); // Если не удалось обновить
  }
}

module.exports = {create, getAll, deleteOne, update}