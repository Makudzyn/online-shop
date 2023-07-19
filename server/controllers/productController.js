const {Product} = require("../models/models");
const path = require("path");
const uuid = require('uuid');
const ApiError = require("../error/ApiError.js");

async function create(req, res, next) {
  try {
    const {name, price, brandId, typeId, info} = req.body;
    const {img} = req.files;
    let fileName = uuid.v4() + ".jpg";
    await img.mv(path.resolve(__dirname, "..", 'static', fileName));

    const product = await Product.create(
      {name, price, brandId, typeId, img: fileName}
    );
    return res.json(product);
  } catch (e) {
    next(ApiError.badRequest(e.message));
  }
}
async function getAll(req, res) {
  let {typeId, brandId, limit, page} = req.query;
  page = page || 1;
  limit = limit || 10;
  let offset = page * limit - limit;
  let products
  if (!brandId && !typeId) {
    products = await Product.findAndCountAll({limit, offset});
  }
  if (brandId && !typeId) {
    products = await Product.findAndCountAll({where: {brandId}, limit, offset});
  }
  if (!brandId && typeId) {
    products = await Product.findAndCountAll({where: {typeId}, limit, offset});

  }
  if (brandId && typeId) {
    products = await Product.findAndCountAll({where: {typeId, brandId}, limit, offset});
  }
  return res.json(products);
}

async function getOne(req, res) {

}

async function remove(req, res) {
  const {productId} = req.params;
  try {
    const product = (await Product.findByPk({productId})).destroy();
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    return res.json(product);
  } catch (e) {
    return res.status(500).json({ error: 'Failed to delete product' });
  }
}

module.exports = {create, getAll, getOne, remove}