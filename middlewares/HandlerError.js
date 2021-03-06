function HandlerError(err, req, res, next) {
  let { statusCode = 500, message } = err;

  if (err.name === 'ValidationError') {
    statusCode = 400;
  } else if (err.name === 'CastError') {
    statusCode = 400;
    message = 'ID not found';
  } else if (err.code === 11000) {
    statusCode = 409;
    message = 'This email is already in use';
  }
  res.status(statusCode).send({
    message: statusCode === 500 ? 'Произошла ошибка' : message,
  });
  next();
}
module.exports = HandlerError;
