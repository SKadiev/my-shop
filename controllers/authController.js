const User = require('../User');
const bcrypt = require('bcrypt');

exports.getLogin = (req, res, next) => {
  res.render('pages/login', { title: 'Login' });
};

exports.getSignUp = (req, res, next) => {
  res.render('pages/signup', { title: 'SignUp' });
};

exports.postLogin = (req, res, next) => {
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
            return res.redirect('/login');

          }
        })
      }


    });
};

exports.postSignUp = (req, res, next) => {

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
          res.redirect('/');
        })
    })
};
