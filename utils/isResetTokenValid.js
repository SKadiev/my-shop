
module.exports = (req, user) =>  req.params.token === user.resetPasswordToken && Date.now() <= user.resetPasswordTokenExpiration ;