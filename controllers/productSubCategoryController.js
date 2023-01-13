const ProductSubcategory = require('../models/ProductSubCategory'); 
exports.getAddSubcategory = (req, res, next) => {
  const errorMsg = req.flash('errorMsg');
  res.render('pages/subcategory/add-subcategory', { title: 'Add builder', errorMsg });
};


exports.postAddSubcategory = (req, res, next) => {
  if (!req.body.name) {
    req.flash('errorMsg', 'Empty field name');
    res.redirect('back');
  }
  
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

    });
};