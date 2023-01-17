
module.exports = (req) => {
  return req.params.token === req.session.resetPasswordToken || Date.now() < req.params.token;
}