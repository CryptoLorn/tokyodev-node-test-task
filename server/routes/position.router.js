const Router = require('express');
const router = new Router();

const positionControllers = require('../controllers/position.controller');
const positionMiddleware = require('../middleware/position.middleware');

router.post('/', positionMiddleware.checkIsBodyValid, positionControllers.create);
router.get('/', positionControllers.getWithParams);
router.get('/:id', positionControllers.getById);
router.put('/:id', positionMiddleware.checkIsBodyValid, positionControllers.updateById);
router.delete('/:id', positionControllers.deleteById);

module.exports = router;