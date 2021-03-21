const mongoose = require('mongoose');
// Подключаем валидацию плчты
const { isEmail } = require('validator');
// Подключаем криптомодуль
const bcrypt = require('bcryptjs');
// Подключаем кастомные ошибки
const AuthError = require('../errors/auth-err');
// Подклчаем сообщения об ошибках
const { MONGO_VALIDATION, AUTH_ERROR } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, MONGO_VALIDATION.REQUIRED],
    minlength: [2, MONGO_VALIDATION.TOO_SHORT],
    maxlength: [30, MONGO_VALIDATION.TOO_LONG],
  },
  email: {
    type: String,
    required: [true, MONGO_VALIDATION.REQUIRED],
    unique: true,
    validate: {
      validator(v) {
        return isEmail(v);
      },
      message: MONGO_VALIDATION.WRONG_EMAIL,
    },
  },
  password: {
    type: String,
    required: [true, MONGO_VALIDATION.REQUIRED],
    minlength: [8, MONGO_VALIDATION.TOO_SHORT],
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUser(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new AuthError(AUTH_ERROR.BAD_CREDENTIALS),
        );
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new AuthError(AUTH_ERROR.BAD_CREDENTIALS),
          );
        }
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
