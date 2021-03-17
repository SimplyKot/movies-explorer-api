const movies = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');

const {
  getMovies,
  addMovie,
  deleteMovie,
} = require('../controllers/movies');

// Получаем все фильмы пользователя
movies.get('/', getMovies);

// Добавляем фильм в избранное
movies.post('/',
  // celebrate({}),
  addMovie);

// Удаляем фильм из избранного
movies.delete(
  '/:movieId',
  celebrate({
    [Segments.PARAMS]: {
      movieId: Joi.string().required().length(24).hex(),
    },
  }),
  // Joi.number().required().positive(),
  deleteMovie,
);

module.exports = movies;
