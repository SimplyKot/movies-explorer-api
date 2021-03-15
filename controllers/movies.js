const Movie = require("../models/movie");
const DenyError = require("../errors/deny-err");
const NotFoundError = require("../errors/not-found-err");

module.exports.testMovie = (req, res, next) => {
  return res.send("TestMovie!");
};

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .orFail(new Error("Невозможно получить фильмы"))
    .then((data) => res(send(data)))
    .catch((err) => next(err));
};

module.exports.addMovie = (req, res, next) => {
  console.log(req.user._id);
  console.log(req.params.data);
  const data = { ...req.params.data, owner: req.user._id };
  Movie.create(data)
    .then((data) => res.send(data))
    .catch((err) => next(err));
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params.movieId;
  Movie.findById(movieId)
    .orFail(new NotFoundError("Фильм не существует"))
    .then((data) => {
      if (data.ownerId != req.user._id) {
        throw new DenyError("Невозможно удалить чужой фильм");
      } else
        Movie.findByIdAndDelete(movieId)
          .then((data) => res.send(`Фильм с "id" ${data._id} удален`))
          .catch((err) => next(err));
    })
    .catch((err) => next(err));
};
