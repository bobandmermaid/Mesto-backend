const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.auth = (req, res, next) => {
  if (!req.cookies.jwt) {
    res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  const token = req.cookies.jwt;

  let payload;

  try {
    const { NODE_ENV, JWT_SECRET } = process.env;

    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'some-strong-secret',
    );
  } catch (err) {
    res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  req.user = payload;

  next();
};
