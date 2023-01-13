const express = require('express'); 
const router = express.Router();
const builderController = require('../../controllers/builderController');
const { csrfSynchronisedProtection: csrf } = require('../../utils/csrf');
const authMiddleware = require('../../middleware/is-auth');

router.get('/add-builder', builderController.getAddBuilder);
router.post('/add-builder', builderController.postAddBuilder);

module.exports = router;