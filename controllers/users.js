const User = require('../models/user');
const { validationError } = require('./validationError');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res
      .status(500)
      .send({ message: err.message }));
};

module.exports.getUserId = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(() => {
      res
        .status(404)
        .send({ message: `Неправильный ID=${userId} пользователя!` });
    })
    .then((user) => res.send({ data: user }))
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
      res
        .status(404)
        .send({ message: `Неправильный ID=${owner} пользователя!` });
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
      res
        .status(404)
        .send({ message: `Неправильный ID=${owner} пользователя!` });
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => validationError(err, req, res));
};
