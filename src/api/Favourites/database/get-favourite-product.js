const db = require('../../../../models');

export async function getFavouriteProduct(productId) {
  const products = await db.Favorites.findOne({
    where: {
      productId,
    },
  });
  console.log(products);
  return products;
}
