const User = require('../models/User');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const isValidationPassed = require('../utils/isValidationPassed');
exports.getLogin = (req, res, next) => {
  if (res.isLoggedIn) {
    return res.redirect('/');
  }

  const loginErrorMsg = req.flash('errorMsg');
  res.render('pages/login', { title: 'Login', errorMsg: loginErrorMsg, oldInput: { name: '', password: '', confirmPassword: '' } });
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
        } else {
          req.flash('errorMsg', 'User or password don"t exists');
          return res.status(422).render('pages/login', {
            title: 'Login', errorMsg: 'User or password don"t exists', oldInput: {
              email: req.body.email, password: req.body.password, confirmPassword: req.body.confirmPassword
            }
          });
        }
      });
  } else {
    const loginErrorMsg = req.flash('errorMsg');
    return res.status(422).render('pages/login', {
      title: 'Login', errorMsg: loginErrorMsg, oldInput: {
        email: req.body.email, password: req.body.password, confirmPassword: req.body.confirmPassword
      }
    });
  }
};

exports.postSignUp = (req, res, next) => {
  if (isValidationPassed(req)) {
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
    return res.redirect('/signup');
  }

};
