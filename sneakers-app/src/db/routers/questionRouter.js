const Router = require('express');

const router = new Router();
const controller = require('../controllers/questionController');

router.post('/send', controller.sendQuestion);

module.exports = router;
