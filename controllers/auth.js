/* eslint-disable consistent-return */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const escape = require('escape-html');
const passwordValidator = require('password-validator');
const User = require('../models/user');
const { validationError } = require('./validationError');
require('dotenv').config();

// eslint-disable-next-line new-cap
const schemaPassword = new passwordValidator();
schemaPassword
  .is()
  .min(10)
  .is()
  .max(100)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits(2)
  .has()
  .not()
  .spaces();

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  if (!password || !email || !avatar || !about || !name) {
    return res
      .status(400)
      .send({ message: 'Все поля должны быть заполнены' });
  }
  if (schemaPassword.validate(password)) {
    bcrypt.hash(escape(password), 10)
      .then((hash) => User.create({
        name: escape(name),
        about: escape(about),
        avatar: escape(avatar),
        email: escape(email),
        password: hash,
      }))
      .then(() => {
        res
          .status(201)
          .send({
            message: 'Пользователь успешно добавлен',
          });
      })
      .catch((err) => {
        if (err.name === 'MongoError' && err.code === 11000) {
          return res
            .status(409)
            .send({
              message: `Пользователь с таким Email=${email} уже зарегестрирован!`,
            });
        }

        validationError(err, req, res);
      });
  } else {
    return res
      .status(400)
      .send({
        message: 'Пароль должен содержать минимум 10 символов, строчные/прописные буквы, 2 цифры',
      });
  }
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!password || !email) {
    return res
      .status(400)
      .send({ message: 'Поля email и "пароль" должны быть заполнены' });
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const { NODE_ENV, JWT_SECRET = 'dev-key' } = process.env;
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'some-strong-secret',
        { expiresIn: '7d' },
      );

      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          // sameSite: true,
        })
        .end();
    })
    .catch((err) => res
      .status(401)
      .send({ message: err.message }));
};
