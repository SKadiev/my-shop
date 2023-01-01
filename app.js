const express = require('express');
const path = require('path')
const session = require('express-session');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const MongoDBStore = require('express-mongodb-session')(session);

const app = express();
const store = new MongoDBStore({
  uri: process.env.DATABASE,
  collection: 'shopSessions'
});

const indexRoutes = require('./routes/shop/index');
const authRoutes = require('./routes/admin/auth');
app.use(expressLayouts)
app.set('layout', 'layouts/index')
app.set("layout extractScripts", true)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
  secret: 'my-secret',
  resave: false,
  saveUninitialized: false,
  store: store
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(indexRoutes);
app.use(authRoutes);

app.get('*', (req, res, next) => {
  res.status(404).render('pages/404', { title: 'Page not found' });
});

module.exports = app;
