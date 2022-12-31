const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const app = express();
const indexRoutes = require('./routes/index');
app.set('view engine', 'ejs')
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')));
app.use(indexRoutes);

app.get('*', (req, res, next) => {
  res.status(404).render('pages/404', { title: 'Page not found' });
})

app.listen(8000, () => {
  console.log('Listening on port 8000');
})
