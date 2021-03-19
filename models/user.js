const mongoose = require('mongoose');
// Подключаем валидацию плчты
const { isEmail } = require('validator');
// Подключаем криптомодуль
const bcrypt = require('bcryptjs');
// Подключаем кастомные ошибки
const AuthError = require('../errors/auth-err');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Поле 'name' должно быть заполнено"],
    minlength: [2, "Минимальная длина поля 'name' - 8 символов"],
    maxlength: [30, "Макмальная длина поля 'name' - 30 символов"],
  },
  email: {
    type: String,
    required: [true, "Поле 'email' должно быть заполнено"],
    unique: true,
    validate: {
      validator(v) {
        return isEmail(v);
      },
      message: "Неверное значение 'email'",
    },
  },
  password: {
    type: String,
    required: [true, "Поле 'password' должно быть заполнено"],
    minlength: [8, "Минимальная длина поля 'password' - 8 символов"],
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUser(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new AuthError('Неправильные пользователь или пароль'),
        );
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new AuthError('Неправильные пользователь или пароль'),
          );
        }
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
