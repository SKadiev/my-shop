const { nextTick } = require('process');

exports.getIndex = (req, res, next) => {
  res.render('pages/index', { title: 'Index page' });
}