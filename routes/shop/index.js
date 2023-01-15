const express = require('express');
const authMiddleware = require('../../middleware/is-auth');

const router = express.Router();
const shopController = require('../../controllers/shopController');
const productController = require('../../controllers/productController');

router.get('/', authMiddleware, shopController.getIndex);
router.get('/products', shopController.getProducts);
router.get('/product/:id', productController.getProductInfo);

module.exports = router;