const { Products } = require('../../../../models');

export async function getProductWithId(product) {
  try {
    console.log('🚒🚒🚒', product);
    const productData = await Products.findOne({
      where: {
        id: product.id,
      },
    });
    return productData;
  } catch (error) {
    console.log(error);
    return null;
  }
}
