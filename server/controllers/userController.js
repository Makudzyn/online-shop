const ApiError = require("../error/ApiError.js")
const {User, Basket} = require("../models/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateJWT = (id, email, role) => {
  return jwt.sign(
    {id, email, role},
    process.env.SECRET_KEY,
    {expiresIn: "24h"}
  )
}

async function registration(req, res, next) {
  const {email, password, role} = req.body;
  if (!email || !password) {
    return next(ApiError.badRequest("Empty field of password or email!"));
  }
  const isExists = await User.findOne({where: {email}});
  if (isExists) {
    return next(ApiError.badRequest("User with current email already exists!"));
  }
  const hashPassword = await bcrypt.hash(password, 3);
  const user = await User.create({email, role, password: hashPassword});
  const basket = await Basket.create({userId: user.id});
  const token = generateJWT(user.id, user.email, user.role);
  return res.json({token});
}
async function login(req, res, next) {
  const {email, password} = req.body;
  const user = await User.findOne({where: {email}});
  if (!user) {
    return next(ApiError.badRequest("There is no user with this email!"));
  }
  let comparePassword = bcrypt.compareSync(password, user.password);
  if (!comparePassword) {
    return next(ApiError.badRequest("Wrong password."));
  }
  const token = generateJWT(user.id, user.email, user.role);
  return res.json({token});
}
async function authCheck(req, res, next) {
  const token = generateJWT(req.user.id, req.user.email, req.user.role);
  return res.json({token});
}

async function deleteOne(req, res) {
  const {id} = req.params;
  try {
    const user = (await User.findOne({where: {id}})).destroy();
    if (!user) {
      return res.status(404).json({ error: 'User not found' }); //replace with ErrorApi
    }
    return res.json(user);
  } catch (e) {
    return res.status(500).json({ error: 'Failed to delete user'}); //replace with ErrorApi
  }
}

module.exports = {registration, login, authCheck, deleteOne}