const express = require('express'); 
const router = express.Router();
const builderController = require('../../controllers/builderController');
const { csrfSynchronisedProtection: csrf } = require('../../utils/csrf');
const authMiddleware = require('../../middleware/is-auth');
const { body } = require('express-validator');

router.get('/add-builder', builderController.getAddBuilder);
router.post('/add-builder',body('name').isLength({min: 1}).withMessage('Name must be entered'), builderController.postAddBuilder);

module.exports = router;