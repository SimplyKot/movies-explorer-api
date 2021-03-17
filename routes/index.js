const router = require('express').Router();

// Импортирует celebrate
const { celebrate, Joi } = require('celebrate');

// Импортируем лимитер для авторизации и действий пользователей
const { authLimiter, actionLimiter } = require('../middlewares/rateLimiter');

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
  authLimiter,
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
  authLimiter,
  createUser,
);

// Проверка авторизации
router.use(auth);

// Огрганичиваем частоту действий авторизированных пользователе
router.use(actionLimiter);

router.use('/users', users);
router.use('/movies', movies);

router.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

module.exports = router;
