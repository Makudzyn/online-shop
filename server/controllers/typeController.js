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

async function deleteOne(req, res) {
  const {id} = req.params;
  try {
    const type = (await Type.findOne({where: {id}})).destroy();
    if (!type) {
      return res.status(404).json({error: 'Type not found'}); //replace with ErrorApi
    }
    return res.json(type);
  } catch (e) {
    return res.status(500).json({ error: 'Failed to delete type'}); //replace with ErrorApi
  }
}

module.exports = {create, getAll, deleteOne}