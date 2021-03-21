// Пдключаем защиту от брутфорса
const rateLimit = require('express-rate-limit');

// Полключаем сообщения
const { LIMITER_ERROR } = require('../utils/constants');

// Настраиваем защиту создания пользователя и аутентификации
module.exports.authLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // За 5 минут
  max: 10, // 10 подключений
  message: { message: LIMITER_ERROR.AUTH_LIMIT_REACHED },
});

// Настраиваем защиту создания пользователя и аутентификации
module.exports.actionLimiter = rateLimit({
  windowMs: 1000, // За 1 секунду
  max: 1, // 1 действие
  message: { message: LIMITER_ERROR.ACTION_LIMIT_REACHED },
});
