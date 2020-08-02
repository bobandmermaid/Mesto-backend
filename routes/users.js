const path = require('path');

// eslint-disable-next-line import/no-dynamic-require
const users = require(path.join(__dirname, '../data/users.json'));

const usersRouter = (req, res) => {
  res.send(users);
};

const userRouter = (req, res) => {
  const { id } = req.params;
  const result = users.find(({ _id }) => _id === id);

  if (!result) {
    res.status(404).send({ message: 'Нет пользователя с таким id' });
    return;
  }
  res.send(result);
};

module.exports = {
  usersRouter,
  userRouter,
};
