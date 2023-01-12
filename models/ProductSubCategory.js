
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const ProductSubCategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  
})


module.exports = mongoose.model('SubCategory', ProductSubCategorySchema);
