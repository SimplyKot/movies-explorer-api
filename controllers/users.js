const { NODE_ENV, JWT_SECRET } = process.env;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { USER_EXIST } = require('../utils/constants');
const User = require('../models/user');
const ExistError = require('../errors/exist-err');
const ConflictError = require('../errors/conflict-err');

module.exports.createUser = (req, res, next) => {
  const {
    email, name,
  } = req.body;
  User.findOne({ email })
    .then((data) => {
      if (data) {
        throw new ExistError(USER_EXIST);
      }
    })
    .then(bcrypt.hash(req.body.password, 10)
      .then((hash) => User.create({
        email, password: hash, name,
      })
        .catch(next)
        .then((user) => {
          if (user) {
            res.send({ data: { _id: user._id, email: user.email } });
          }
        })
        .catch(next)))
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findOne({ email })
    .then((data) => {
      console.log(data, email);
      if (data.email !== email) { throw new ConflictError(USER_EXIST); }
    })
    .then(() => User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      {
        new: true,
        runValidators: true,
      },
    ))
    .then((user) => res.send(user))
    .catch((err) => next(err));
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
        {
          expiresIn: '7d',
        },
      );
      // вернём токен
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => next(err));
};
