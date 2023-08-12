const Router = require('express');
const router = new Router();
const brandController = require('../controllers/brandController.js');
const checkRole = require("../middleware/checkAuthAndRoleMiddleware");


router.get('/', brandController.getAll);
router.post('/', checkRole("ADMIN"), brandController.create);
router.delete('/:id', brandController.deleteOne);

module.exports = router;