const ApiError = require("../error/ApiError.js")
async function registration(req, res) {

}
async function login(req, res) {

}
async function authCheck(req, res, next) {
  const {id} = req.query;
  if (!id) {
    return next(ApiError.badRequest("Undefined ID"));
  }
  res.json(id);
}

module.exports = {registration, login, authCheck}