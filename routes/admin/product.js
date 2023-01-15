const express = require('express'); 
const router = express.Router();
const productController = require('../../controllers/productController');
const subCategoryController = require('../../controllers/productSubCategoryController');
const { csrfSynchronisedProtection: csrf } = require('../../utils/csrf');
const authMiddleware = require('../../middleware/is-auth');

router.get('/add-product', productController.getAddProduct);
router.post('/add-product', productController.postAddProduct);
router.get('/products', productController.getAdminProducts);

module.exports = router;