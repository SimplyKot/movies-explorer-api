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

// Получаем конфигурацию для mongoDB
const { DB_HOST, DB_PORT, DB_NAME } = require('./config/mongodb');

// Импортируем лимитер для авторизации и действий пользователей
const { actionLimiter } = require('./middlewares/rateLimiter');

// Подключаемся к mongoDB
const isProductionHost = process.env.NODE_ENV === 'production';
const mongoConnectString = isProductionHost ? `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}` : 'mongodb://localhost:27017/test';

mongoose.connect(mongoConnectString, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const corsOptions = {
  origin: ['*', 'http://loсalhost:3000'],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Подклюяаем логирование
const { requestLogger, errorLogger } = require('./middlewares/logger');

// Импортируем файл с маршрутами
const routes = require('./routes/index');

// Импортируем файл с описанием ошибок
const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3000 } = process.env;
const app = express();

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(actionLimiter);

// Логируем запросы
app.use(requestLogger);

// Включаем CORS
app.use(cors(corsOptions));

// Подключаем все маршруты
app.use(routes);

// Логируем ошибки
app.use(errorLogger);

// Подключаем централизованный обработчик ошибок
app.use(errorHandler);

app.listen(PORT);
