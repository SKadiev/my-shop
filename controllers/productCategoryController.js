exports.getAddCategory = (req, res, next) => {
  const errorMsg = req.flash('errorMsg');
  res.render('pages/category/add-category', { title: 'Add category', errorMsg });
};
