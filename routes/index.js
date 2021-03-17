const router = require('express').Router();

const users = require('./users');
const movies = require('./movies');

router.use('/users', users);
router.use('/movies', movies);

router.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

module.exports = router;
