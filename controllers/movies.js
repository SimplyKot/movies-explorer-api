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
      // eslint-disable-next-line eqeqeq
      if (data.owner != req.user._id) {
        throw new DenyError('Невозможно удалить чужой фильм');
      } else {
        Movie.findByIdAndDelete(movieId)
          .then((movie) => res.send({ message: `Фильм с "id" ${movie._id} удален` }))
          .catch((err) => next(err));
      }
    })
    .catch((err) => next(err));
};
