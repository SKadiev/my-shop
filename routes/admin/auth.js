const express = require('express');

const router = express.Router();
const authController = require('../../controllers/authController');
const { csrfSynchronisedProtection: csrf } = require('../../utils/csrf');
const authMiddleware = require('../../middleware/is-auth');

router.get('/login', authController.getLogin);

router.post('/login', csrf, authController.postLogin);

router.post('/logout', csrf, authController.postLogout);

router.get('/signup', authController.getSignUp);

router.post('/signup', csrf, authController.postSignUp);

module.exports = router;