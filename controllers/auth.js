const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { validationError } = require('./validationError');
require('dotenv').config();

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  if (!password || !email || !avatar || !about || !name) {
    res
      .status(400)
      .send({ message: 'Все поля должны быть заполнены' });
  } else if (password.length < 10 || password.trim().length === 0) {
    res
      .status(400)
      .send({ message: 'Пароль должен быть минимум 10 символов' });
  }

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then(() => {
      res
        .status(201)
        .send({
          message: 'Пользователь успешно добавлен',
        });
    })
    .catch((err) => validationError(err, req, res));
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!password || !email) {
    res
      .status(400)
      .send({ message: 'Поля email и "пароль" должны быть заполнены' });
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const { NODE_ENV, JWT_SECRET } = process.env;
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
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
