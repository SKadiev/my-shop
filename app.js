const express = require('express');
const path = require('path')
const app = express();
app.use('/static', express.static(path.join(__dirname, 'public')))
app.get('/', (req, res, next) => {
  return res.send('<link href="/styles.css" ><h1>Test</h1>');
});

app.listen(8000, () => {
  console.log('Listening on port 8000');
})
