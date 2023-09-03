const Router = require('express');
const router = new Router();
const cartController = require('../controllers/cartController');

router.get('/', cartController.getAllCartProducts);
router.post('/add', cartController.addToCart);
router.delete('/remove/:id', cartController.removeCartProduct);

module.exports = router;