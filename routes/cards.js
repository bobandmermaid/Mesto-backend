// const routerCards = require('express').Router();
const cards = require('../data/cards.json');

const cardsRouter = (req, res) => {
  res.send(cards);
};

module.exports = { cardsRouter };
