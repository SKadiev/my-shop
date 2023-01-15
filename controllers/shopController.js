const Product = require('../models/Product'); 

exports.getIndex = (req, res, next) => {
  res.render('pages/index', { title: process.env.APP_NAME , username: req.session.user.name});
}


exports.getProducts = (req, res, next) => {
  console.log(req.session);
  Product.find()
    .then(products => {
      res.render('pages/product/products', { title: 'Products' , products});
    })
    .catch(err => {
      console.log(err);
    })  
}

