const Product = require('../models/Product');
const products = [];
class ProductInventory {

  getAllProducts() {
    Product.find()
      .then(productsRes => {
        products = productsRes.toArray();
        return products;
      })
      .then(products => {
        console.log(products);
        
      })
      .catch(err => {
        console.log(err);
      })
  }

  addProducts(productSpec) {

  }

  search(productSpec) {
    
  }
}

module.exports = ProductInventory;