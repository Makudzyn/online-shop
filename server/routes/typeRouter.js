const Router = require('express');
const router = new Router();
const typeController = require('../controllers/typeController.js');
const checkRole = require("../middleware/checkAuthAndRoleMiddleware.js");

router.get('/', typeController.getAll)
router.post('/', checkRole("ADMIN"), typeController.create)
router.put('/:id', checkRole("ADMIN"), typeController.update)
router.delete('/:id', checkRole("ADMIN"), typeController.deleteOne)

module.exports = router;