const router = require('express').Router();
const { usersRouter, userRouter } = require('./users');
const { cardsRouter } = require('./cards');
const { errorMessage } = require('./error');

router.get('/users', usersRouter);
router.get('/users/:id', userRouter);
router.get('/cards', cardsRouter);
router.all('*', errorMessage);

module.exports = router;
