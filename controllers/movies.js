const Movie = require('../models/movie');
const DenyError = require('../errors/deny-err');
const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-err');
const { FILM_ERROR } = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  const owner = req.user;
  Movie.find({ owner })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => next(err));
};

module.exports.addMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail,
    movieId,
  } = req.body;
  const data = {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    owner: req.user._id,
    movieId,
  };

  Movie.findOne({ movieId })
    .then((movie) => {
      if (movie) {
        throw new ConflictError(FILM_ERROR.FILM_ALREADY_EXIST);
      }
    })
    .then(() => Movie.create(data)
      .then((movie) => res.send(movie))
      .catch((err) => next(err)))
    .catch((err) => next(err));
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .populate('owner')
    .orFail(new NotFoundError(FILM_ERROR.FILM_NOT_FOUND))
    .then((data) => {
      if (data.owner._id.toString() === req.user._id) {
        Movie.findByIdAndDelete(movieId)
          .then((movie) => res.send({ message: `Фильм с "id" ${movie._id} удален` }))
          .catch((err) => next(err));
      } else {
        throw new DenyError(FILM_ERROR.NOT_OWNER);
      }
    })
    .catch((err) => next(err));
};
