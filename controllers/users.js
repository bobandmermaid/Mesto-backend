const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { validationError } = require('./validationError');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.getUserId = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(() => {
      res.status(404).send({ message: 'Нет пользователя с таким id!' });
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => validationError(err, req, res));
};

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash,
      });
    })
    .then((user) => {
      res.status(201).send({ _id: user._id, email: user.email });
    })
    .catch((err) => validationError(err, req, res));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  const owner = req.user._id;

  User.findByIdAndUpdate(
    owner,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      res.status(404).send({ message: 'Пользователь не обновляется!' });
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => validationError(err, req, res));
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const owner = req.user._id;

  User.findByIdAndUpdate(
    owner,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      res.status(404).send({ message: 'Аватар не обновляется!' });
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => validationError(err, req, res));
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });

      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        // sameSite: true,
      })
        .end();
    })
    .catch((err) => res.status(401).send({ message: err.message }));
};
