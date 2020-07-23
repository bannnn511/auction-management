const { Products } = require('../../../../models');

export function getProductWithId(product) {
  try {
    const products = Products.findOne({
      where: {
        id: product.productId,
      },
    });
    return products;
  } catch (error) {
    console.log(error);
    return null;
  }
}
