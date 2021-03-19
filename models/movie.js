const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, "Поле 'country' должно быть заполнено"],
  },
  director: {
    type: String,
    required: [true, "Поле 'director' должно быть заполнено"],
  },
  duration: {
    type: Number,
    required: [true, "Поле 'duration' должно быть заполнено"],
  },
  year: { type: Number, required: [true, "Поле 'year' должно быть заполнено"] },
  description: {
    type: String,
    required: [true, "Поле 'description' должно быть заполнено"],
  },
  image: {
    type: String,
    required: [true, "Поле 'image' должно быть заполнено"],
    validate: {
      validator(v) {
        const regex = /^((http|https):\/\/)?(www\.)?[a-zA-Z0-9-]{1,}\.?([a-z0-9]{1,})?\.([a-z0-9]{1,})?\.?\w{1,}?(\/([\w#!:.?+=&%@!\-/])*)?/i;
        return regex.test(v);
      },
      message: 'Ссылка на картинку некорректна',
    },
  },
  trailer: {
    type: String,
    required: [true, "Поле 'trailer' должно быть заполнено"],
    validate: {
      validator(v) {
        const regex = /^((http|https):\/\/)?(www\.)?[a-zA-Z0-9-]{1,}\.?([a-z0-9]{1,})?\.([a-z0-9]{1,})?\.?\w{1,}?(\/([\w#!:.?+=&%@!\-/])*)?/i;
        return regex.test(v);
      },
      message: 'Ссылка на трейлер некорректна',
    },
  },
  nameRU: {
    type: String,
    required: [true, "Поле 'nameRU' должно быть заполнено"],
  },
  nameEN: {
    type: String,
    required: [true, "Поле 'nameEN' должно быть заполнено"],
  },
  thumbnail: {
    type: String,
    required: [true, "Поле 'thumbnail' должно быть заполнено"],
    validate: {
      validator(v) {
        const regex = /^((http|https):\/\/)?(www\.)?[a-zA-Z0-9-]{1,}\.?([a-z0-9]{1,})?\.([a-z0-9]{1,})?\.?\w{1,}?(\/([\w#!:.?+=&%@!\-/])*)?/i;
        return regex.test(v);
      },
      message: 'Ссылка на миниатюру некорректна',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, "Поле 'owner' должно быть заполнено"],
    select: false,
  },
  movieId: {
    type: Number,
    required: [true, "Поле 'movieId' должно быть заполнено"],
  },
});

module.exports = mongoose.model('movie', movieSchema);
