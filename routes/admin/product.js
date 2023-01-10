const express = require('express'); 
const router = express.Router();
const productController = require('../../controllers/productController');
const { csrfSynchronisedProtection: csrf } = require('../../utils/csrf');
const authMiddleware = require('../../middleware/is-auth');

router.get('/add-product', productController.getAddProduct);

module.exports = router;