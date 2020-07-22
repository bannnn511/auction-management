const { Products } = require('../../../../models');

export function getAllProducts() {
  try {
    const products = Products.findAll();
    return products;
  } catch (error) {
    console.log(error);
    return null;
  }
}
