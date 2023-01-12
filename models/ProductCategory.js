
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const ProductCategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  
})


module.exports = mongoose.model('ProductCategory', ProductCategorySchema);
