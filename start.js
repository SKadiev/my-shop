require('dotenv').config();

const app = require('./app');

const server = app.listen(8000, () => {
  console.log('Listening on port 8000');
})
