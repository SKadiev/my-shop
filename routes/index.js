const indexRoutes = require('./shop/index');
const authRoutes = require('./auth');
const productRoutes = require('./admin/product');
const builderRoutes = require('./admin/builder');
const productCategoryRoutes = require('./admin/category');
const productSubCategoryRoutes = require('./admin/subcategory');

const initRoutes = (app) => {
  app.use(indexRoutes);
  app.use(authRoutes);
  app.use('/admin', productRoutes);
  app.use('/admin', builderRoutes);
  app.use('/admin', productCategoryRoutes);
  app.use('/admin', productSubCategoryRoutes);
}

module.exports = initRoutes;
