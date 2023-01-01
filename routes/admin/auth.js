const express = require('express');

const router = express.Router();
const authController = require('../../controllers/authController');

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignUp);

module.exports = router;