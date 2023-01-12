import ProductModel from '../models/Product';

class Product {
  price;
  serialNumber;
  productSpec;
  productCategory;

  constructor(productSpec) {
    this.productSpec = productSpec;
    this.price = price;
    this.serialNumber = +serialNumber;
    this.productCategory = productCategory;
  }
}

module.exports = Product;