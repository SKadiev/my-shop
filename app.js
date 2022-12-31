const express = require('express');

const app = express();

app.get('/', (req, res, next) => {
  return res.send('<h1>Test</h1>');
});

app.listen(8000, () => {
  console.log('Listening on port 8000');
})
