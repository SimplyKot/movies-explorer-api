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
  windowMs: 4000, // За 4 секунды
  max: 4, // 4 действия (из за preflight для cors  и  двойного запроса при авторизаии)
  message: { message: LIMITER_ERROR.ACTION_LIMIT_REACHED },
});
