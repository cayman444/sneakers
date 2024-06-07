const Router = require('express');
const { check } = require('express-validator');

const router = new Router();
const controller = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post(
  '/registration',
  [
    check('username', 'Имя пользователя не должно быть пустым').notEmpty(),
    check('password', 'Пароль не должен быть пустым').notEmpty(),
  ],
  controller.registration
);
router.post('/login', controller.login);
router.get('/user', authMiddleware, controller.getUser);
router.get('/users', authMiddleware, controller.getUsers);

module.exports = router;
