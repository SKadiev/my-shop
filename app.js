const express = require('express');
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");
const path = require('path')
const session = require('express-session');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const { generateToken, getTokenFromRequest, getTokenFromState } = require('./utils/csrf');
const MongoDBStore = require('express-mongodb-session')(session);
const liveReloadServer = livereload.createServer();
const getYear = require('./middleware/get-year');
const User = require('./models/User');
const initRoutes = require('./routes/index'); 
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

const app = express();
app.use(connectLiveReload());
app.use(getYear);

const store = new MongoDBStore({
  uri: process.env.DATABASE,
  collection: 'shopSessions'
});

// const indexRoutes = require('./routes/shop/index');
// const authRoutes = require('./routes/auth');
// const productRoutes = require('./routes/admin/product');
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
app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});


app.use((req, res, next) => {
  const tokenFromState = getTokenFromState(req);
  if (tokenFromState) {
    res.locals.csrfToken = tokenFromState;

  } else {
    const csrfToken = generateToken(req);
    res.locals.csrfToken = csrfToken;
  }
  res.locals.isLoggedIn = req.session.isLoggedIn;
  res.isLoggedIn = req.session.isLoggedIn;
  res.locals.path = req.path;
  if(req.path !== '/login' || req.path !== '/signup') {
    res.locals.styles = null;

  }
  next();
});

initRoutes(app);
// app.use(indexRoutes);
// app.use(authRoutes);
// app.use('/admin', productRoutes);

app.get('*', (req, res, next) => {
  res.status(404).render('pages/404', { title: 'Page not found' });
});

module.exports = app;
