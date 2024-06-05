const Router = require('express');
const { check } = require('express-validator');
// const authMiddleware = require('./middleware/authMiddleware');
const roleMiddleware = require('./middleware/roleMiddleware');

const router = new Router();
const controller = require('./authController');

router.post(
  '/registration',
  [
    check('username', 'Имя пользователя не должно быть пустым').notEmpty(),
    check('password', 'Пароль не должен быть пустым').notEmpty(),
  ],
  controller.registration
);
router.post('/login', controller.login);
router.get('/users', roleMiddleware(['Admin', 'User']), controller.getUsers);

module.exports = router;
