const path = require('path');

const cardsRouter = (req, res) => {
  // eslint-disable-next-line global-require,import/no-dynamic-require
  const cards = require(path.join(__dirname, '../data/cards.json'));
  res.send(cards);
};

module.exports = { cardsRouter };
