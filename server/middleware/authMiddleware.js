const jwt = require("jsonwebtoken");
const ApiError = require("../error/ApiError.js");

// Функция авторизации пользователя, проверяющая валидность JWT-токена
module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") { // Нужны только POST, PUT, GET, DELETE
    next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1]; // Первый параметр - тип токена, второй сам токен
    if (!token) {
      return next(ApiError.badRequest("Jwt-token was not provided!")); // Если токена нет возвращаем ошибку
    }
    req.user = jwt.verify(token, process.env.SECRET_KEY); // Если токен есть раскодируем его используя ключ и присваиваем в поле user
    next();
  } catch (e) {
    return next(ApiError.unauthorized(e.message)); // Если токен не валиден возвращаем ошибку
  }
}

