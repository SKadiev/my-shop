exports.getLogin = (req, res, next) => {
  res.render('pages/login', { title: 'Login' });
};

exports.getSignUp = (req, res, next) => {
  res.render('pages/signup', { title: 'SignUp' });
};