// Подключаем файл окружения .env
require("dotenv").config();

// Подключаем сервер
const express = require("express");
// Подключаем модуль связи с БД
const mongoose = require("mongoose");
// Подклбчаем защиту CORS
const cors = require("cors");

// Подключаемся к mongoDB
mongoose.connect("mongodb://localhost:27017/kotomovies", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Включаем CORS
app.use(cors());

app.listen(PORT);
// eslint-disable-next-line no-console
console.log(`App started on port ${PORT}`);
