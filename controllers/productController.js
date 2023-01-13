exports.getAddProduct = (req, res, next) => {
  const errorMsg = req.flash('addProductErrorMsg');
  res.render('pages/product/add-product', { title: 'Add product', errorMsg });
};


exports.getAdminProducts = (req, res, next) => {
  const errorMsg = req.flash('errorMsg');
  res.render('pages/product/admin-products', { title: 'Admin products', errorMsg });
};

