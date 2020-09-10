const NotFoundError = require('./errors/not-found-err');

module.exports = (req, res, next) => {
  try {
    throw new NotFoundError('The requested resource is not found');
  } catch (error) {
    next(error);
  }
};
