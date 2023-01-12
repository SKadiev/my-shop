exports.getAddProduct = (req, res, next) => {
  const errorMsg = req.flash('addProductErrorMsg');
  res.render('pages/product/add-product', { title: 'Add product', errorMsg });
};


exports.getAdminProducts = (req, res, next) => {
  const errorMsg = req.flash('errorMsg');
  res.render('pages/product/admin-products', { title: 'Admin products', errorMsg });
};

exports.getAddBuilder = (req, res, next) => {
  const errorMsg = req.flash('errorMsg');
  res.render('pages/builder/add-builder', { title: 'Add builder', errorMsg });
};

exports.getAddCategory = (req, res, next) => {
  const errorMsg = req.flash('errorMsg');
  res.render('pages/category/add-category', { title: 'Add category', errorMsg });
};

exports.getAddSubcategory = (req, res, next) => {
  const errorMsg = req.flash('errorMsg');
  res.render('pages/subcategory/add-subcategory', { title: 'Add builder', errorMsg });
};