const Router = require('express');
const router = new Router();
const typeController = require('../controllers/typeController.js');
const productController = require("../controllers/productController");
const checkRole = require("../middleware/checkRoleMiddleware.js");

router.post('/', checkRole("ADMIN"), typeController.create)
router.get('/', typeController.getAll)
router.delete('/:id', typeController.deleteOne)

module.exports = router;