// Подключаем файл окружения .env
require("dotenv").config();

// Подключаем сервер
const express = require("express");
// Подключаем модуль связи с БД
const mongoose = require("mongoose");
// Подклбчаем защиту CORS
const cors = require("cors");

// Подключаемся к mongoDB
mongoose.connect("mongodb://localhost:27017/kotomoviesdb", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const { celebrate, Joi } = require("celebrate");
const users = require("./routes/users");
const movies = require("./routes/movies");
const { login, createUser } = require("./controllers/users");



const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Включаем CORS
app.use(cors());


app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(2).max(8).alphanum(),
    }),
  }),
  login
);
app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(2).max(8).alphanum(),
    }),
  }),
  createUser
);


app.use("/users", users);
app.use("/movies", movies);

app.listen(PORT);
// eslint-disable-next-line no-console
console.log(`App started on port ${PORT}`);
