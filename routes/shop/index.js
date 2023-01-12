const express = require('express');
const authMiddleware = require('../../middleware/is-auth');

const router = express.Router();
const shopController = require('../../controllers/shopController');

router.get('/', authMiddleware, shopController.getIndex);
router.get('/products', shopController.getProducts);

module.exports = router;