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
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.number().required(),
      description: Joi.string().required(),
      image: Joi.string().required().uri(),
      trailer: Joi.string().required().uri(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
      thumbnail: Joi.string().required().uri(),
    }),
  }),
  addMovie);

// Удаляем фильм из избранного
movies.delete(
  '/:movieId',
  celebrate({
    [Segments.PARAMS]: {
      movieId: Joi.string().required().length(24).hex(),
    },
  }),
  deleteMovie,
);

module.exports = movies;
