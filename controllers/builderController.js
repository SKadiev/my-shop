const Builder = require('../models/Builder');
const isValidationPassed = require('../utils/isValidationPassed');

exports.getAddBuilder = (req, res, next) => {
  const errorMsg = req.flash('errorMsg');
  res.render('pages/builder/add-builder', { title: 'Add builder', errorMsg });
};
exports.postAddBuilder = (req, res, next) => {
  if (isValidationPassed(req)) {
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
        return res.redirect('back');
      });
  } else {
    return res.redirect('back');
  }
};