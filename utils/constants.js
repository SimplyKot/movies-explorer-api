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

const USER_EXIST = 'Пользователь с такой почтой существует';

const FILM_ERROR = {
  FILM_NOT_FOUND: 'Фильм не существует',
  NOT_OWNER: 'Невозможно удалить чужой фильм',
  FILM_ALREADY_EXIST: 'Этот фильм уже был добавлен вами в ибранные ранее',
  FILM_DELETED: 'Фильм успешно удален',
};

module.exports = {
  AUTH_ERROR, MONGO_VALIDATION, LIMITER_ERROR, USER_EXIST, FILM_ERROR,
};
