exports.getAddProduct = (req, res, next) => {
  const errorMsg = req.flash('addProductErrorMsg');
  res.render('pages/product/add-product', { title: 'Add product', errorMsg });
};