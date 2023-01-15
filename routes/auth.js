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
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 chars long'),
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
  body('name').notEmpty().isLength({ min: 6 }).trim().escape().withMessage('Name must be at least 6 chars long'),
  body('password').notEmpty().isLength({ min: 6 }).withMessage('Password must be at least 6 chars long'),
  body('password_confirmation').notEmpty().custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }

    // Indicates the success of this synchronous custom validator
    return true;
  }),
  authController.postSignUp);

module.exports = router;