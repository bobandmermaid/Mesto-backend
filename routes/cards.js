const router = require('express').Router();
const validator = require('validator');
const { celebrate, Joi } = require('celebrate');

const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

Joi.objectId = require('joi-objectid')(Joi);

router.get('/', getCards);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.required().custom((v) => {
      if (!validator.isURL(v)) {
        throw new BadRequest('Недопустимй адрес');
      } else {
        return v;
      }
    }),
  }),
}), createCard);

router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    id: Joi.objectId(),
  }),
}), deleteCard);

router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.objectId(),
  }),
}), likeCard);

router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.objectId(),
  }),
}), dislikeCard);

module.exports = router;
