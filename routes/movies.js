const movies = require("express").Router();
const { celebrate, Joi } = require("celebrate");

const {
  getMovies,
  addMovie,
  deleteMovie,
  testMovie,
} = require("../controllers/users");

// Тестовый роут
movies.get("/test", testMovie);

// Получаем все фильмы пользователя
movies.get("/", getMovies);

// Добавляем фильм в избранное
movies.post("/", addMovie);

// Удаляем фильм из избранного
movies.delete(
  "/:movieId",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().length(24).hex(),
    }),
  }),
  deleteMovie
);

module.exports = movies;
