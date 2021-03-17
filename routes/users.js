const users = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getCurrentUser,
  updateUser,
} = require('../controllers/users');

// ПОлучаем пользователя
users.get('/me', getCurrentUser);

// Обновляем профиль пользователя
users.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(2).max(8)
        .alphanum(),
    }),
  }),
  updateUser,
);

module.exports = users;
