const User = require('../models/User');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const isValidationPassed = require('../utils/isValidationPassed');
const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');

const resetOldInputForm = (req) => {
  req.flash('oldInput', {
    email: '', password: '', confirmPassword: '', name: '', confirmPassword: ''
  })
};

var mailer = nodemailer.createTransport(sgTransport({
  auth: {
    api_key: process.env.MAIL_API_KEY
  }
}));

exports.getLogin = (req, res, next) => {
  if (res.isLoggedIn) {
    return res.redirect('/');
  }

  const loginErrorMsg = req.flash('errorMsg');
  const oldInput = req.flash('oldInput');
  const validationErrors = req.flash('validationErrors');
  res.render('pages/login',
    {
      title: 'Login', errorMsg: loginErrorMsg,
      oldInput: {
        name: oldInput[0]?.name,
        email: oldInput[0]?.email,
        password: oldInput[0]?.password,
        confirmPassword: oldInput[0]?.confirmPassword
      },
      validationErrors
    });
};

exports.getSignUp = (req, res, next) => {
  if (res.isLoggedIn) {
    return res.redirect('/');
  }
  const signUpErrorMsg = req.flash('errorMsg');
  const oldInput = req.flash('oldInput');
  const validationErrors = req.flash('validationErrors');

  res.render('pages/signup', {
    title: 'SignUp', errorMsg: signUpErrorMsg, oldInput: {
      name: oldInput[0]?.name,
      email: oldInput[0]?.email,
      password: oldInput[0]?.password,
      confirmPassword: oldInput[0]?.confirmPassword
    },
    validationErrors
  })

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
              resetOldInputForm(req);
              return res.redirect('/');

            } else {
              req.flash('errorMsg', 'Wrong email or password');
              req.flash('oldInput', {
                email: req.body.email, password: req.body.password, confirmPassword: req.body.confirmPassword
              })
              return res.redirect('/login');
            }
          })
        } else {
          req.flash('errorMsg', 'User or password don"t exists');
          req.flash('oldInput', {
            email: req.body.email, password: req.body.password, confirmPassword: req.body.confirmPassword
          });
          console.log(req.flash('validationErrors'));
          return res.redirect('/login');
        }
      });
  } else {
    return res.redirect('/login');
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
            resetOldInputForm(req);
             mailer.sendMail({
                to: user.email,
                from: 'alt.r7-5oj3z2c2@yopmail.com',
                subject: 'Thank you for signing in my shop',
                text: 'Thank you for signing in my shop',
                html: '<b>Enjoy using my shop</b>'
              }, (err, result) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log(result);
                }
              })
            return res.redirect('/');
          })
      })
  } else {
    req.flash('oldInput', {
      email: req.body.email, name: req.body.name, password: req.body.password, confirmPassword: req.body.password_confirmation
    });

    return res.redirect('/signup');
  }

};
