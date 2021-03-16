// Подключаем файл окружения .env
require("dotenv").config();

// Подключаем сервер
const express = require("express");
// Подклюяаем логирование
const { requestLogger, errorLogger } = require("./middlewares/logger");
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
const auth = require("./middlewares/auth")



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

app.use(auth);

app.use("/users", users);
app.use("/movies", movies);

app.use("*", (req, res) => {
  res.status(404).send({ message: "Запрашиваемый ресурс не найден" });
});

app.use(errorLogger);

// TODO: Настроить централизованный обработчик ошибок
// TODO: Настроить централизованный express rate limiter
// TODO: Настроить централизованный hemlet?

app.use((err, req, res, next) => {

  if (isCelebrateError(err)) {
    let message = "";
    const errorParam = err.details.get('params'); // 'params' is a Map()
    const errorBody = err.details.get('body'); // 'details' is a Map()

    if (errorParam) {
      const { details: [errorDetailsParams] } = errorParam;
      message = errorDetailsParams.message;
    }
    if (errorBody) {
      const { details: [errorDetailsParams] } = errorBody;
      message = errorDetailsParams.message;
    }

    return res.status(400).send({ "message": message }
    )

  }
  else {
    res.status(err.statusCode || 500).send({ message: err.message || "Ошибка сервера" })
  }
})

app.listen(PORT);
// eslint-disable-next-line no-console
console.log(`App started on port ${PORT}`);
