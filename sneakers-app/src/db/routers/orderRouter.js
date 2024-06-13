const Router = require('express');
const authMiddleware = require('../middleware/authMiddleware');

const router = new Router();
const controller = require('../controllers/orderController');

router.post('/send', authMiddleware, controller.sendOrder);
router.get('/get', authMiddleware, controller.getOrders);

module.exports = router;
