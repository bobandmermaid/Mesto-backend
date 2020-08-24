/* eslint-disable consistent-return */
const escape = require('escape-html');
const Card = require('../models/card');
const { validationError } = require('./validationError');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res
      .status(500)
      .send({ message: err.message }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  if (!name || !link) {
    return res
      .status(400)
      .send({ message: 'Все поля должны быть заполнены' });
  }

  Card.create({ name: escape(name), link: escape(link), owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => validationError(err, req, res));
};

module.exports.deleteCard = async (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  await Card.findById(cardId)
    .orFail(() => {
      res
        .status(404)
        .send({ message: `Неправильный ID=${cardId} карточки!` });
    });
  Card.findOneAndRemove({ _id: cardId, owner: userId })
    .then((card) => {
      if (!card) {
        return res
          .status(403)
          .send({ message: 'Это не ваша карточка!' });
      }
      res.send({ data: card });
    })
    .catch((err) => validationError(err, req, res));
};

module.exports.likeCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      res
        .status(404)
        .send({ message: `Неправильный ID=${cardId} карточки!` });
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => validationError(err, req, res));
};

module.exports.dislikeCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      res
        .status(404)
        .send({ message: `Неправильный ID=${cardId} карточки!` });
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => validationError(err, req, res));
};
