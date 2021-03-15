const users = require("express").Router();
const { celebrate, Joi } = require("celebrate");

const {
  getCurrentUser,
  updateUser,
  testUser,
} = require("../controllers/users");

// Тестовый роут
users.get("/", testUser);

// ПОлучаем пользователя
users.get("/me", getCurrentUser);

// Обновляем профиль пользователя
users.patch(
  "/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().email(),
    }),
  }),
  updateUser
);

module.exports = users;
