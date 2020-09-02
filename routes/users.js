const router = require('express').Router();
const validator = require('validator');
const { celebrate, Joi } = require('celebrate');

const {
  getUsers, getUserId, updateUser, updateAvatar,
} = require('../controllers/users');

Joi.objectId = require('joi-objectid')(Joi);

router.get('/', getUsers);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    id: Joi.objectId(),
  }),
}), getUserId);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.required().custom((v) => {
      if (!validator.isURL(v)) {
        throw new BadRequest('Недопустимй адрес');
      } else {
        return v;
      }
    }),
  }),
}), updateAvatar);

module.exports = router;
