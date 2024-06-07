const Router = require('express');

const router = new Router();
const controller = require('../controllers/productController');

router.post('/save', controller.productSave);
router.get('/render', controller.productRender);

module.exports = router;
