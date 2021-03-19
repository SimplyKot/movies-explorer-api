const mongoose = require('mongoose');

const { MONGO_VALIDATION } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, MONGO_VALIDATION.REQUIRED],
  },
  director: {
    type: String,
    required: [true, MONGO_VALIDATION.REQUIRED],
  },
  duration: {
    type: Number,
    required: [true, MONGO_VALIDATION.REQUIRED],
  },
  year: { type: Number, required: [true, MONGO_VALIDATION.REQUIRED] },
  description: {
    type: String,
    required: [true, MONGO_VALIDATION.REQUIRED],
  },
  image: {
    type: String,
    required: [true, MONGO_VALIDATION.REQUIRED],
    validate: {
      validator(v) {
        const regex = /^((http|https):\/\/)?(www\.)?[a-zA-Z0-9-]{1,}\.?([a-z0-9]{1,})?\.([a-z0-9]{1,})?\.?\w{1,}?(\/([\w#!:.?+=&%@!\-/])*)?/i;
        return regex.test(v);
      },
      message: MONGO_VALIDATION.WRONG_LINK,
    },
  },
  trailer: {
    type: String,
    required: [true, MONGO_VALIDATION.REQUIRED],
    validate: {
      validator(v) {
        const regex = /^((http|https):\/\/)?(www\.)?[a-zA-Z0-9-]{1,}\.?([a-z0-9]{1,})?\.([a-z0-9]{1,})?\.?\w{1,}?(\/([\w#!:.?+=&%@!\-/])*)?/i;
        return regex.test(v);
      },
      message: MONGO_VALIDATION.WRONG_LINK,
    },
  },
  nameRU: {
    type: String,
    required: [true, MONGO_VALIDATION.REQUIRED],
  },
  nameEN: {
    type: String,
    required: [true, MONGO_VALIDATION.REQUIRED],
  },
  thumbnail: {
    type: String,
    required: [true, MONGO_VALIDATION.REQUIRED],
    validate: {
      validator(v) {
        const regex = /^((http|https):\/\/)?(www\.)?[a-zA-Z0-9-]{1,}\.?([a-z0-9]{1,})?\.([a-z0-9]{1,})?\.?\w{1,}?(\/([\w#!:.?+=&%@!\-/])*)?/i;
        return regex.test(v);
      },
      message: MONGO_VALIDATION.WRONG_LINK,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, MONGO_VALIDATION.REQUIRED],
    select: false,
  },
  movieId: {
    type: Number,
    required: [true, MONGO_VALIDATION.REQUIRED],
  },
});

module.exports = mongoose.model('movie', movieSchema);
