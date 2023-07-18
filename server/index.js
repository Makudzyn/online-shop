require('dotenv').config();

const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const router = require('./routes/index')
const errorHandler = require('./middleware/errorHandlingMiddleware.js')

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);

app.use(errorHandler); //Должен идти последним, на нем работа должна прекратиться

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

