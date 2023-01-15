const ProductSubcategory = require('../models/ProductSubCategory');
const isValidationPassed = require('../utils/isValidationPassed');

exports.getAddSubcategory = (req, res, next) => {
  const errorMsg = req.flash('errorMsg');
  res.render('pages/subcategory/add-subcategory', { title: 'Add builder', errorMsg });
};


exports.postAddSubcategory = (req, res, next) => {

  if (isValidationPassed(req)) {
    const productSubcategory = new ProductSubcategory({
      name: req.body.name
    });
    productSubcategory.save()
      .then(productSubcategory => {
        res.redirect('/');
      })
      .catch(err => {
        console.log(err);
        req.flash('errorMsg', 'Error creating subcategory');
        return res.redirect('back');

      });

  } else {
    return res.redirect('back');
  }
};