/* eslint-disable consistent-return */
const escape = require('escape-html');
const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.getCards = async (req, res, next) => {
  try {
    const card = await Card.find({});
    return res.send(card);
  } catch (err) {
    return next(err);
  }
};

module.exports.createCard = async (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  try {
    const card = await Card.create({ name: escape(name), link: escape(link), owner });
    return res.send(card);
  } catch (err) {
    return next(err);
  }
};

module.exports.deleteCard = async (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  try {
    const cardObj = await Card.findById(cardId)
      .orFail(() => new NotFoundError('Карточки не существует'));

    if (userId !== cardObj.owner.toString()) {
      throw new ForbiddenError('Нельзя удалить чужую карточку');
    }
    const card = await Card.findOneAndRemove({ _id: cardId, owner: userId });
    return res.send(card);
  } catch (err) {
    return next(err);
  }
};

module.exports.likeCard = async (req, res, next) => {
  const { cardId } = req.params;
  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
      .orFail(() => new NotFoundError('Карточки не существует'));
    return res.send(card);
  } catch (err) {
    return next(err);
  }
};

module.exports.dislikeCard = async (req, res, next) => {
  const { cardId } = req.params;
  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
      .orFail(() => new NotFoundError('Карточки не существует'));
    return res.send(card);
  } catch (err) {
    return next(err);
  }
};
