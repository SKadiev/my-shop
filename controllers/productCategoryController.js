const ProductCategory = require('../models/ProductCategory');
const { validationResult } = require('express-validator');
const isValidationPassed = require('../utils/isValidationPassed');

exports.getAddCategory = (req, res, next) => {
  const errorMsg = req.flash('errorMsg');
  res.render('pages/category/add-category', { title: 'Add category', errorMsg });
};

exports.postAddCategory = (req, res, next) => {
  if (isValidationPassed(req)) {
    const productCategory = new ProductCategory({
      name: req.body.name
    });
    productCategory.save()
      .then(productCategory => {
        res.redirect('/');
      })
      .catch(err => {
        console.log(err);
        req.flash('errorMsg', 'Error creating product category');
        return res.redirect('back');

      });

  } else {
    return res.redirect('back');
  }
};


