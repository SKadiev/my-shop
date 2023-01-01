exports.getIndex = (req, res, next) => {
  res.render('pages/index', { title: process.env.APP_NAME });
}


