exports.getIndex = (req, res, next) => {
  res.render('pages/index', { title: process.env.APP_NAME , username: req.session.user.name});
}


exports.getProducts = (req, res, next) => {
  console.log(req.session);
  res.render('pages/product/products', { title: 'Products' });
}

