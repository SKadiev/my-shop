const express = require('express'); 
const router = express.Router();
const productController = require('../../controllers/productController');
const subCategoryController = require('../../controllers/productSubCategoryController');
const { csrfSynchronisedProtection: csrf } = require('../../utils/csrf');
const authMiddleware = require('../../middleware/is-auth');
const { body, validationResult } = require('express-validator');

router.get('/add-product', productController.getAddProduct);
router.get('/products', productController.getAdminProducts);
router.post('/add-product',
  body('name').isLength({ min: 6 }).withMessage('Name must be at least 6 chars long'),
  body('price').isInt({min: 1}).withMessage('Price must be at least 1'),
  body('serial_number').isInt({min: 1}).withMessage('Serial number must be present'),
  productController.postAddProduct);

module.exports = router;