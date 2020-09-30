const { Products } = require('../../../../models');

export async function getProductWithId(id) {
  const productData = await Products.findOne({
    where: {
      id,
    },
  });
  return productData;
}
