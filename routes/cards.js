const cards = require('../data/cards.json');

const cardsRouter = (req, res) => {
  res.send(cards);
};

module.exports = { cardsRouter };
