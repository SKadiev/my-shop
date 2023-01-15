const User = require('../models/User');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const isValidationPassed = require('../utils/isValidationPassed');
exports.getLogin = (req, res, next) => {
  if (res.isLoggedIn) {
    return res.redirect('/');
  }
  const loginErrorMsg = req.flash('errorMsg');
  res.render('pages/login', { title: 'Login', errorMsg: loginErrorMsg });
};

exports.getSignUp = (req, res, next) => {
  if (res.isLoggedIn) {
    return res.redirect('/');
  }
  const signUpErrorMsg = req.flash('errorMsg');
  res.render('pages/signup', { title: 'SignUp', errorMsg: signUpErrorMsg });
};

exports.postLogout = (req, res, next) => {
  req.session.user = null;
  req.session.isLoggedIn = false;
  res.redirect('/');
};


exports.postLogin = (req, res, next) => {
  if (isValidationPassed(req)) {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email })
      .then(user => {
        if (user) {
          bcrypt.compare(password, user.password).then(function (result) {
            if (result) {
              req.session.user = user;
              req.session.isLoggedIn = true;
              return res.redirect('/');

            } else {
              req.flash('errorMsg', 'Wrong email or password');
              return res.redirect('/login');
            }
          })
        }
      });
  } else {
    return res.redirect('/login');

  }
};

exports.postSignUp = (req, res, next) => {
  if (isValidationPassed(req)) {
    User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10)
          .then(hash => {
            const user = new User({
              name: req.body.name,
              password: hash,
              email: req.body.email,
            })

            user.save()
              .then(user => {
                console.log(user);
                return res.redirect('/');
              })
          })
      } else {
        req.flash('errorMsg', 'User with this email exist');
        return res.redirect('/signup');
      }

    })
  } else {
    return res.redirect('/signup');

  }
};
