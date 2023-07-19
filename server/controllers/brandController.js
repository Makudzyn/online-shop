const {Brand} = require("../models/models.js");
const ApiError = require('../error/ApiError.js');

async function create(req, res) {
  const {name} = req.body;
  const brand = await Brand.create({name});
  return res.json(brand);
}
async function getAll(req, res) {
  const brands = await Brand.findAll();
  return res.json(brands);
}

async function deleteOne(req, res) {
  const {id} = req.params;
  try {
    const brand = (await Brand.findOne({where: {id}})).destroy();
    if (!brand) {
      return res.status(404).json({ error: 'Brand not found' }); //replace with ErrorApi
    }
    return res.json(brand);
  } catch (e) {
    return res.status(500).json({ error: 'Failed to delete brand'}); //replace with ErrorApi
  }
}



module.exports = {create, getAll, deleteOne}