const express = require('express'); 
const router = express.Router();
const subCategoryController = require('../../controllers/productSubCategoryController');
const { csrfSynchronisedProtection: csrf } = require('../../utils/csrf');
const authMiddleware = require('../../middleware/is-auth');

router.get('/add-subcategory', subCategoryController.getAddSubcategory);
router.post('/add-subcategory', subCategoryController.postAddSubcategory);

module.exports = router;