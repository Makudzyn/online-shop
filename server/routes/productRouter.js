const Router = require('express');
const router = new Router();
const productController = require('../controllers/productController.js');

router.post('/', productController.create)
router.get('/', productController.getAll)
router.get('/:id', productController.getOne)
router.delete('/:id', productController.remove)

module.exports = router;