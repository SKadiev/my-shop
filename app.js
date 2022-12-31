const express = require('express');
const path = require('path')
const app = express();
app.set('view engine', 'ejs')

app.set('views', 'views');
app.use(express.static('public'))
app.get('/', (req, res, next) => {
  return res.render('pages/index', { title: 'Index page' });
});

app.listen(8000, () => {
  console.log('Listening on port 8000');
})
