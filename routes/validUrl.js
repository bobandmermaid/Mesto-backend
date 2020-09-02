const validator = require('validator');

const { BadRequestError } = require('../errors/bad-request-err');

module.exports = (v) => {
  if (!validator.isURL(v)) {
    throw new BadRequestError('Недопустимй адрес');
  } else {
    return v;
  }
};
