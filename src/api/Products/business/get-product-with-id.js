const { Products } = require('../../../../models');

export async function getProductWithId(id) {
  try {
    const productData = await Products.findOne({
      where: {
        id,
      },
    });
    return productData;
  } catch (error) {
    console.log(error);
    return null;
  }
}
