const Builder = require('../models/Builder'); 

exports.getAddBuilder = (req, res, next) => {
  const errorMsg = req.flash('errorMsg');
  res.render('pages/builder/add-builder', { title: 'Add builder', errorMsg });
};
exports.postAddBuilder = (req, res, next) => {
  if (!req.body.name) {
    req.flash('errorMsg', 'Empty field name');
    res.redirect('back');
  }
  
  const builder = new Builder({
    name: req.body.name
  });
  builder.save()
    .then(builder => {
      res.redirect('/');
    })
    .catch(err => {
      console.log(err);
      req.flash('errorMsg', 'Error creating builder');

    });
};