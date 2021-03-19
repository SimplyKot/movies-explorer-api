const { isCelebrateError } = require('celebrate');

module.exports = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    let message = '';
    const errorParam = err.details.get('params');
    const errorBody = err.details.get('body');

    if (errorParam) {
      const { details: [errorDetailsParams] } = errorParam;
      message = errorDetailsParams.message;
    }
    if (errorBody) {
      const { details: [errorDetailsParams] } = errorBody;
      message = errorDetailsParams.message;
    }

    res.status(400).send({ message });
    next(err);
  } else { res.status(err.statusCode || 500).send({ message: err.message || 'Ошибка сервера' }); }
};
