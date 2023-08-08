const jwt = require("jsonwebtoken");
const ApiError = require("../error/ApiError.js");

// Функция проверки роли пользователя
module.exports = function (role) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") { // Нужны только POST, PUT, GET, DELETE
      next();
    }
    try {
      const token = req.headers.authorization.split(' ')[1]; // Первый параметр - тип токена, второй сам токен
      if (!token) {
        return next(ApiError.badRequest("Jwt-token was not provided!")); // Если токена нет возвращаем ошибку
      }
      const decoded = jwt.verify(token, process.env.SECRET_KEY); // Раскодируем токен используя ключ
      if (decoded.role !== role) {
        return next(ApiError.forbidden("You don`t have permission for this.")); // Если роль пользователя не имеет права на выполнение действия возвращаем ошибку
      }
      req.user = decoded; // Если все ок присваиваем в поле user
      next();
    } catch (e) {
      return next(ApiError.unauthorized(e.message)); // Если токен не валиден возвращаем ошибку
    }
  }
}


