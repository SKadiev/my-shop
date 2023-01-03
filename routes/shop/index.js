const express = require('express');
const authMiddleware = require('../../middleware/is-auth'); 

const router = express.Router();
const shopController = require('../../controllers/shopController'); 

router.get('/', authMiddleware, shopController.getIndex);

module.exports = router;