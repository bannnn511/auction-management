const { db } = require('../../../../models');

export async function getProductWithId(product) {
  try {
    const products = await db.Products.findOne({
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
