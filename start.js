//* Start server

require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.Database, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection
  .on('open', () => {
    console.log('Mongoose connection open');
  })
  .on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
  });


const app = require('./app');

const server = app.listen(8000, () => {
  console.log('Listening on port 8000');
})

