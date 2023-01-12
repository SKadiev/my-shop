
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const BuilderSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  
})


module.exports = mongoose.model('Builder', BuilderSchema);
