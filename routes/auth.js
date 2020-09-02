const signup = require('express').Router();
const signin = require('express').Router();
const validator = require('validator');

const { celebrate, Joi } = require('celebrate');
const { createUser, login } = require('../controllers/auth');

signup.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    avatar: Joi.required().custom((v) => {
      if (!validator.isURL(v)) {
        throw new BadRequest('Недопустимй адрес');
      } else { return v; }
    }),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(10),
  }),
}), createUser);

signin.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(10),
  }),
}), login);

module.exports = { signup, signin };
