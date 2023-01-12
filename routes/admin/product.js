const express = require('express'); 
const router = express.Router();
const productController = require('../../controllers/productController');
const { csrfSynchronisedProtection: csrf } = require('../../utils/csrf');
const authMiddleware = require('../../middleware/is-auth');

router.get('/add-product', productController.getAddProduct);
router.get('/products', productController.getAdminProducts);
router.get('/add-builder', productController.getAddBuilder);
router.get('/add-category', productController.getAddCategory);
router.get('/add-subcategory', productController.getAddSubcategory);

module.exports = router;