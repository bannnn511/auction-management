const { Products } = require('../../../../models');

export function createProduct(product) {
  try {
    const newProduct = Products.create({
      productName: product.productName,
      imgUrl: product.imgUrl,
      currentPrice: product.currentPrice,
      buyNowPrice: product.buyNowPrice,
      endAt: product.endAt,
      createdBy: product.createdBy,
      updatedBy: product.updatedBy,
    });
    return newProduct;
  } catch (error) {
    console.log(error);
    return null;
  }
}
