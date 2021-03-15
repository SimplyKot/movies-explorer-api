const users = require("express").Router();
const { celebrate, Joi } = require("celebrate");

const {
  getMovies,
  addMovie,
  deleteMovie,
  testMovie,
} = require("../controllers/users");

// Тестовый роут
users.get("/test", testMovie);

// ПОлучаем пользователя
users.get("/", getMovies);

// Обновляем профиль пользователя
users.delete(
  "/:movieId",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().length(24).hex(),
    }),
  }),
  deleteMovie
);

module.exports = users;
