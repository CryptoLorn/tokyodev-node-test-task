const Router = require('express');
const router = new Router();

const applicantController = require('../controllers/applicant.controller');

router.post('/', applicantController.create);
router.get('/', applicantController.getAll);
router.put('/:id', applicantController.updateById);
router.delete('/:id', applicantController.deleteById);

module.exports = router;