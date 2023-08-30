const Router = require('express');
const router = new Router();
const productController = require('../controllers/productController.js');
const checkRole = require("../middleware/checkAuthAndRoleMiddleware");

router.get('/', productController.getAll)
router.get('/:id', productController.getOne)
router.post('/', checkRole("ADMIN"), productController.create)
router.put('/:id', checkRole("ADMIN"), productController.update)
router.delete('/:id', checkRole("ADMIN"), productController.deleteOne)

module.exports = router;