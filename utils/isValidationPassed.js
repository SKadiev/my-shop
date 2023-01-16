const { validationResult } = require('express-validator');

module.exports = (req) => {
  let errorMsg = '';
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorList =  errors.array();
    errorList.forEach(error => {
      errorMsg += error.msg + '<br>';
    });
    req.flash('errorMsg', errorMsg);
    req.flash('validationErrors', errorList);
    return false;
  } 
  return true;
}


