const jwt = require("jsonwebtoken");

module.exports = function (role) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      const token = req.headers.authorization.split(' ')[1]; // Первый параметр - тип токена, второй сам токен
      if (!token) {
        return res.status(401).json({message: "User is not authorized"});
      }
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (decoded.role !== role) {
        return res.status(403).json({message: "You don`t have permission for this."});
      }
      req.user = decoded;
      next();
    } catch (e) {
      return res.status(401).json({message: "User is not authorized"});
    }
  }
}


