const AUTH_ERROR = {
  NOT_AUTHOIZED: 'Необходима авторизация',
  BAD_CREDENTIALS: 'Неправильные пользователь или пароль',
  WRONG_TOKEN: 'Токен неверный',
};
const MONGO_VALIDATION = {
  REQUIRED: 'Поле должно быть заполнено',
  TOO_SHORT: 'Слишком короткое значение',
  TOO_LONG: 'Слишком длинное значение',
  WRONG_EMAIL: 'Значение не является адоесом email',
  WRONG_LINK: 'Значение не является корректной ссылкой',
};

const LIMITER_ERROR = {
  AUTH_LIMIT_REACHED: 'Превышено количество попыток авторизации с этого IP',
  ACTION_LIMIT_REACHED: 'Первышена частота запросов с этого IP',
};

module.exports = { AUTH_ERROR, MONGO_VALIDATION, LIMITER_ERROR };
