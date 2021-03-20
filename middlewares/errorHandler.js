const { isCelebrateError } = require('celebrate');
const { DEFAULT_SERVER_ERROR } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  let message = err.message || '';
  let statusCode = err.statusCode || 500;
  if (isCelebrateError(err)) {
    statusCode = 400;
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
  }

  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = err.message;
  }

  res.status(statusCode || 500).send({ message: message || DEFAULT_SERVER_ERROR });

  next(err);
};
