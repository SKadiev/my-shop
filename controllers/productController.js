const Product = require('../models/Product');
const ProductCategory = require('../models/ProductCategory');
exports.getAddProduct = (req, res, next) => {
  const errorMsg = req.flash('errorMsg');
  ProductCategory.find()
    .then(productCategories => {
      console.log(productCategories);
      res.render('pages/product/add-product', { title: 'Add product', errorMsg, productCategories });
    })
    .catch(err => {
      console.log(err);
    })
};

exports.postAddProduct = (req, res, next) => {
  if (!req.body.name || !req.body.price || !req.body.serial_number  || !req.body.product_category) {
    req.flash('errorMsg', 'Empty field name');
    return res.redirect('back');


  }
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    serialNumber: req.body.serial_number,
    productCategory: req.body.product_category
  });
  product.save()
    .then(product => {
      res.redirect('/');
    })
    .catch(err => {
      console.log(err);
      req.flash('errorMsg', 'Error creating product');
      return res.redirect('back');
    });
};


exports.getAdminProducts = (req, res, next) => {
  const errorMsg = req.flash('errorMsg');
  res.render('pages/product/admin-products', { title: 'Admin products', errorMsg });
};

