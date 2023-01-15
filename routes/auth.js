const express = require('express');
const User = require('../models/User'); 
const router = express.Router();
const authController = require('../controllers/authController');
const { csrfSynchronisedProtection: csrf } = require('../utils/csrf');
const authMiddleware = require('../middleware/is-auth');
const { body, validationResult } = require('express-validator');

router.get('/login', authController.getLogin);
router.get('/signup', authController.getSignUp);

router.post('/login',
  csrf,
  body('email')
    .isEmail().
    normalizeEmail()
    .withMessage('Must supply email'),
  body('password')
    .notEmpty()
    .withMessage('Must supply password'),
  authController.postLogin
);
router.post('/logout', csrf, authController.postLogout);
router.post(
  '/signup',
  csrf,
  body('email').isEmail().normalizeEmail().withMessage('Must supply email'),
  body('email').custom(value => {
    return User.findOne({email: value}).then(user => {
      if (user) {
        return Promise.reject('E-mail already in use');
      }
    });
  }),
  body('name', 'Name must be at least 6 chars long').isLength({ min: 6 }).trim().escape(),
  body('password', 'Password must be at least 6 chars').isLength({ min: 6 }),
  body('password_confirmation').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }

    // Indicates the success of this synchronous custom validator
    return true;
  }),
  authController.postSignUp);

module.exports = router;