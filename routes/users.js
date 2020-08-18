const router = require('express').Router();
const {
  getUsers, getUserId, createUser, updateUser, updateAvatar, login,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUserId);
router.post('/', createUser);
router.post('/', login);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
