const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  serialNumber: {
    type: Number,
    required: true
  },
  productCategory: {
    type: ObjectId,
    ref: 'ProductCategory'
  }
  
})


module.exports = mongoose.model('Product', ProductSchema);
