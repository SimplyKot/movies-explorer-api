const movies = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const { REGEX_LINK, MONGO_VALIDATION } = require('../utils/constants');

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
      duration: Joi.number().required().min(0),
      year: Joi.number().required().min(1888),
      description: Joi.string().required(),
      image: Joi.string().required()
        .pattern(new RegExp(REGEX_LINK)).message(MONGO_VALIDATION.WRONG_LINK),
      trailer: Joi.string().required()
        .pattern(new RegExp(REGEX_LINK)).message(MONGO_VALIDATION.WRONG_LINK),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
      thumbnail: Joi.string().required()
        .pattern(new RegExp(REGEX_LINK)).message(MONGO_VALIDATION.WRONG_LINK),
      movieId: Joi.number().required().min(0),
    }),
  }),
  addMovie);

// Удаляем фильм из избранного
movies.delete(
  '/:movieId',
  celebrate({
    [Segments.PARAMS]: {
      movieId: Joi.string().required().min(0),
    },
  }),
  deleteMovie,
);

module.exports = movies;
