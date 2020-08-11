const { Products } = require('../../../../models');

export function createProduct(product) {
  try {
    const newProduct = Products.create({
      productName: product.productName,
      imgURL: product.imgURL,
      currentPrice: product.currentPrice,
      buyNowPrice: product.buyNowPrice,
      createdBy: product.createdBy,
      updatedBy: product.updatedBy,
    });
    return newProduct;
  } catch (error) {
    console.log(error);
    return null;
  }
}