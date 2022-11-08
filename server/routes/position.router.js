const Router = require('express');
const router = new Router();

const positionControllers = require('../controllers/position.controller');

router.post('/', positionControllers.create);
router.get('/', positionControllers.getWithParams);
router.get('/:id', positionControllers.getById);
router.put('/:id', positionControllers.updateById);
router.delete('/:id', positionControllers.deleteById);

module.exports = router;