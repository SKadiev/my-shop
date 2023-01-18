const User = require('../models/User');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const isValidationPassed = require('../utils/isValidationPassed');
const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');
const isResetTokenValid = require('../utils/isResetTokenValid');
const { v4: uuidv4 } = require('uuid');

const resetOldInputForm = (req) => {
  req.flash('oldInput', {
    email: '', password: '', confirmPassword: '', name: '', confirmPassword: ''
  })
};

const mailer = nodemailer.createTransport(sgTransport({
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

exports.getForgotPassword = (req, res, next) => {
  res.render('pages/forgot-password', {
    title: 'Forgot password'
  })
};


exports.postForgotPassword = (req, res, next) => {
  const forgotPasswordToken = uuidv4();
  mailer.sendMail({
    to: req.body.email,
    from: 'alt.r7-5oj3z2c2@yopmail.com',
    subject: 'Request for password rest',
    text: 'Click the link the reset password',
    html: '<a href="' + process.env.APP_URL + '/reset-password/' + forgotPasswordToken + '">Reset Password</a>'
  }, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  })
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        console.log(user);
        user.resetPasswordToken = forgotPasswordToken;
        user.resetPasswordTokenExpiration = Date.now() + 3600000;
        user.save();
      }
      return res.redirect('/login');

    })
    .catch(err => {
      console.log(err);
    })
};

exports.resetPassword = (req, res, next) => {
  User.findOne({ resetPasswordToken: req.params.token })
    .then(user => {
      if (user) {
        if (!isResetTokenValid(req, user)) {
          return res.redirect('/');
        }
        const errorMsg = req.flash('errorMsg');
        const oldInput = req.flash('oldInput');
        const validationErrors = req.flash('validationErrors');

        res.render('pages/reset-password',
          {
            title: 'Reset Password ', errorMsg: errorMsg,
            oldInput: {
              password: oldInput[0]?.password,
              confirmPassword: oldInput[0]?.confirmPassword,
            },
            resetPasswordToken: user.resetPasswordToken,
            validationErrors
          });


      } else {
        return res.redirect('/');
      }
    })
    .catch(err => {
      console.log(err);
      return res.redirect('/');
    })
};

exports.resetPostPassword = (req, res, next) => {
  if (isValidationPassed(req)) {
    User.findOne({ resetPasswordToken: req.body.resetPasswordToken })
      .then(user => {
        bcrypt.hash(req.body.password, 10)
          .then(hash => {
            resetOldInputForm(req);
            user.password = hash;
            user.save()
              .then(user => {
                mailer.sendMail({
                  to: user.email,
                  from: 'alt.r7-5oj3z2c2@yopmail.com',
                  subject: 'Password Reset',
                  text: 'Thank you for signing in my shop',
                  html: '<h2>Your password was reset</h2>'
                }, (err, result) => {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log(result);
                  }
                })
                return res.redirect('/');
              });

          })
      })
      .catch(err => {
        console.log(err);
      })
  } else {
    req.flash('oldInput', {
      password: req.body.password,
      confirmPassword: req.body.password_confirmation
    });

    return res.redirect('/reset-password/' + req.body.resetPasswordToken);
  }
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
              validationErrors             } else {
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
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
      confirmPassword: req.body.password_confirmation
    });

    return res.redirect('/signup');
  }

};
