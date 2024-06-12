const Router = require('express');

const router = new Router();
const controller = require('../controllers/orderController');

router.post('/send', controller.sendOrder);

module.exports = router;
