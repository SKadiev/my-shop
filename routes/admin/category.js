const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/productCategoryController');
const { csrfSynchronisedProtection: csrf } = require('../../utils/csrf');
const authMiddleware = require('../../middleware/is-auth');

router.get('/add-category', categoryController.getAddCategory);
router.post('/add-category', categoryController.postAddCategory);

module.exports = router;