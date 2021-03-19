const Movie = require('../models/movie');
const DenyError = require('../errors/deny-err');
const NotFoundError = require('../errors/not-found-err');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((data) => res.send(data))
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
  Movie.create(data)
    .then((movie) => res.send(movie))
    .catch((err) => next(err));
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .orFail(new NotFoundError('Фильм не существует'))
    .then((data) => {
      if (data.owner === req.user._id) {
        Movie.findByIdAndDelete(movieId)
          .then((movie) => res.send({ message: `Фильм с "id" ${movie._id} удален` }))
          .catch((err) => next(err));
      } else {
        throw new DenyError('Невозможно удалить чужой фильм');
      }
    })
    .catch((err) => next(err));
};
