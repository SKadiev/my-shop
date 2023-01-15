const express = require('express'); 
const router = express.Router();
const subCategoryController = require('../../controllers/productSubCategoryController');
const { csrfSynchronisedProtection: csrf } = require('../../utils/csrf');
const authMiddleware = require('../../middleware/is-auth');
const { body } = require('express-validator');

router.get('/add-subcategory', subCategoryController.getAddSubcategory);
router.post('/add-subcategory',body('name').isLength({min: 1}).withMessage('Name must be entered'), subCategoryController.postAddSubcategory);

module.exports = router;