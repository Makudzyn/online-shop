require('dotenv').config();

const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const PORT = process.env.PORT || 5000;
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({message: "Working."})
})

const start = async () => {
  try {
    await sequelize.authenticate(); // Установка подключения к БД
    await sequelize.sync(); // Сверка состояния БД со схемой данных
    app.listen(PORT, () => console.log(`Serv started on port ${PORT}`));
  } catch (e) {
    console.log(e)
  }
}

start();

