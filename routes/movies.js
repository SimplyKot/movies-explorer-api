const movies = require("express").Router();
const { celebrate, Joi, Segments } = require("celebrate");

const {
  getMovies,
  addMovie,
  deleteMovie,
  testMovie,
} = require("../controllers/movies");

// Тестовый роут
movies.get("/test", testMovie);

// Получаем все фильмы пользователя
movies.get("/", getMovies);

// Добавляем фильм в избранное
movies.post("/",
  // celebrate({}),
  addMovie);

// Удаляем фильм из избранного
movies.delete(
  "/:movieId",
  celebrate({
    [Segments.PARAMS]: {
      cardId: Joi.number().required().positive()
    }
  }),
  //Joi.number().required().positive(),
  deleteMovie
);

module.exports = movies;
