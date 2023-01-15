const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/productCategoryController');
const { csrfSynchronisedProtection: csrf } = require('../../utils/csrf');
const authMiddleware = require('../../middleware/is-auth');
const { body } = require('express-validator');

router.get('/add-category', categoryController.getAddCategory);
router.post('/add-category', body('name').isLength({min: 1}).withMessage('Name must be entered'), categoryController.postAddCategory);

module.exports = router;