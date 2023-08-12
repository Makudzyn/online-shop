const Router = require('express');
const router = new Router();
const productController = require('../controllers/productController.js');
const checkRole = require("../middleware/checkAuthAndRoleMiddleware");

router.post('/', checkRole("ADMIN"), productController.create)
router.get('/', productController.getAll)
router.get('/:id', productController.getOne)
router.delete('/:id', productController.deleteOne)

module.exports = router;