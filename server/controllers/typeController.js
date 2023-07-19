const {Type} = require("../models/models.js");
const ApiError = require('../error/ApiError.js');
async function create(req, res) {
  const {name} = req.body;
  const type = await Type.create({name});
  return res.json(type);
}
async function getAll(req, res) {
  const types = await Type.findAll();
  return res.json(types);
}

async function remove(req, res) {
  const {typeId} = req.params;
  const type = (await Type.findByPk({typeId})).destroy();
  return res.json(type);
}

module.exports = {create, getAll, remove}