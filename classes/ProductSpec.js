class ProductSpec {
  model;
  productCategory;
  builder;

  constructor(productSpecObj) {
    this.model = productSpecObj.model;
    this.productCategory = productSpecObj.productCategory;
    this.builder = productSpecObj.builder;
  }
}

module.exports = ProductSpec;