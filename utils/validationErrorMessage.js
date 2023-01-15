module.exports = (errors) => {
  let errorMsg = '';
  errors.forEach(error => {
    errorMsg += error.msg + '<br>'; 
  });

  return errorMsg;
}