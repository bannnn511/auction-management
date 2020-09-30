const { Products } = require('../../../../models');

export function createProduct(product, transaction) {
  const newProduct = Products.create(
    {
      productName: product.productName,
      imgURL: product.imgURL,
      currentPrice: product.currentPrice,
      buyNowPrice: product.buyNowPrice,
      createdBy: product.createdBy,
      updatedBy: product.updatedBy,
    },
    {
      transaction,
    },
  );
  return newProduct;
}
