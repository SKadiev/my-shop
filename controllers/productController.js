const Product = require('../models/Product');
const ProductCategory = require('../models/ProductCategory');
const { validationResult } = require('express-validator');
const isValidationPassed = require('../utils/isValidationPassed');
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
  if (isValidationPassed(req)) {
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      serialNumber: req.body.serial_number,
      productCategory: req.body.product_category
    });
    product.save()
      .then(product => {
        res.redirect('/products');
      })
      .catch(err => {
        console.log(err);
        req.flash('errorMsg', 'Error creating product');
        return res.redirect('back');
      });

  } else {
    return res.redirect('back');
  }
};


exports.getAdminProducts = (req, res, next) => {
  const errorMsg = req.flash('errorMsg');
  res.render('pages/product/admin-products', { title: 'Admin products', errorMsg });
};



exports.getProductInfo = (req, res, next) => {
  const errorMsg = req.flash('errorMsg');
  Product.findById(req.params.id)
    .then(product => {

      res.render('pages/product/product', { title: 'Product info', errorMsg, product });
    })
    .catch(err => {
      console.log(err);
    })
};

