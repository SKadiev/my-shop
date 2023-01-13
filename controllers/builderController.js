exports.getAddBuilder = (req, res, next) => {
  const errorMsg = req.flash('errorMsg');
  console.log(errorMsg);
  res.render('pages/builder/add-builder', { title: 'Add builder', errorMsg });
};
exports.postAddBuilder = (req, res, next) => {
  const errorMsg = req.flash('errorMsg', 'Error');
  res.redirect('/admin/add-builder');
};