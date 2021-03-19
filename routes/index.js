const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');
const NotFoundError = require('../errors/not-found-err');

// Импортирует celebrate

// Импортируем лимитер для авторизации и действий пользователей
// const { authLimiter, actionLimiter } = require('../middlewares/rateLimiter');
// Лимитер упрощен и перенесен в app.js по просьбе ревьюера

const { login, createUser } = require('../controllers/users');
const users = require('./users');
const movies = require('./movies');

// Импортируем файл с авторизацией
const auth = require('../middlewares/auth');

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(2).max(8)
        .alphanum(),
    }),
  }),
  // Лимитер упрощен и перенесен в app.js по просьбе ревьюера
  // authLimiter,
  login,
);
router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(2).max(8)
        .alphanum(),
    }),
  }),
  // Лимитер упрощен и перенесен в app.js по просьбе ревьюера
  // authLimiter,
  createUser,
);

// Проверка авторизации
router.use(auth);

// Огрганичиваем частоту действий авторизированных пользователе
// router.use(actionLimiter);
// Лимитер упрощен и перенесен в app.js по просьбе ревьюера

router.use('/users', users);
router.use('/movies', movies);

router.use('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = router;
