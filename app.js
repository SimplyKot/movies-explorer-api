// Подключаем файл окружения .env
require('dotenv').config();

// Подключаем сервер
const express = require('express');

// Подключаем модуль связи с БД
const mongoose = require('mongoose');

// Подклбчаем защиту CORS
const cors = require('cors');

// Подключаем защиту заголовков hemlet
const helmet = require('helmet');

// Пдключаем защиту от брутфорса
const rateLimit = require('express-rate-limit');

// Настраиваем защиту создания пользователя и аутентификации
const authLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // За 5 минут
  max: 10, // 10 подключений
  message: { message: 'Превышено количество попыток подключения с этого IP, повторите попытку через 5 минут' },
});

// Настраиваем защиту создания пользователя и аутентификации
const actionLimiter = rateLimit({
  windowMs: 1000, // За 1 секунду
  max: 3, // 1 действие
  message: { message: 'Первышена частота запросов. Максимально возможно сделать три запроса в секунду.' },
});

// Подключаемся к mongoDB

const isProductionHost = process.env.NODE_env === 'production';
const { DB_HOST, DB_PORT, DB_NAME } = process.env;
const mongoConnectString = `mongodb://${isProductionHost ? DB_HOST : 'localhost'}:${isProductionHost ? DB_PORT : 27017}/${isProductionHost ? DB_NAME : 'kotomoviesdb'}`;
mongoose.connect(mongoConnectString, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const { celebrate, Joi } = require('celebrate');

// Подклюяаем логирование
const { requestLogger, errorLogger } = require('./middlewares/logger');

const users = require('./routes/users');
const movies = require('./routes/movies');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3000 } = process.env;
const app = express();
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Логируем запросы
app.use(requestLogger);

// Включаем CORS
app.use(cors());

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(2).max(8)
        .alphanum(),
    }),
  }),
  authLimiter,
  login,
);
app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(2).max(8)
        .alphanum(),
    }),
  }),
  authLimiter,
  createUser,
);

app.use(auth);

app.use(actionLimiter);
app.use('/users', users);
app.use('/movies', movies);

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

// Логируем ошибки
app.use(errorLogger);

app.use(errorHandler);

app.listen(PORT);
console.log(PORT);
