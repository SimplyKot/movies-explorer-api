const mongoose = require("mongoose");
// Подключаем валидацию плчты
const { isEmail } = require("validator");
// Подключаем криптомодуль
const bcrypt = require("bcryptjs");
// Подключаем кастомные ошибки
const AuthError = require("../errors/auth-err");

const userSchema = new mongoose.Schema({
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
    minlength: [8, "Мнимальная длина поля 'password' - 8 символов"],
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: [2, "Минимальная длинна поля 'name' - 2 символа"],
    maxlength: [30, "Максимальная длинна поля 'name' - 30 символов"],
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new AuthError("Неправильные пользователь или пароль")
        );
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new AuthError("Неправильные пользователь или пароль")
          );
        }
        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
