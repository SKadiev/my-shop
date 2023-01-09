exports.getIndex = (req, res, next) => {
  console.log(req.session);
  res.render('pages/index', { title: process.env.APP_NAME , username: req.session.user.name});
}


