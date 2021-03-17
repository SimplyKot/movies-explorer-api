const { isCelebrateError } = require('celebrate');

// eslint-disable-next-line no-unused-vars
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

    return res.status(400).send({ message });
  }

  return res.status(err.statusCode || 500).send({ message: err.message || 'Ошибка сервера' });
};
