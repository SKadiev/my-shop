exports.getAddSubcategory = (req, res, next) => {
  const errorMsg = req.flash('errorMsg');
  res.render('pages/subcategory/add-subcategory', { title: 'Add builder', errorMsg });
};