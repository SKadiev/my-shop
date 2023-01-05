module.exports = (req, res, next) => {
  const currentYear = new Date().getFullYear()
  res.locals.currentYear = currentYear;
  next();
}