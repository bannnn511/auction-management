const db = require('../../../../models');

export async function getAuctionWithProductId(product) {
  try {
    const auction = await db.AuctionManagements.findOne({
      where: {
        productId: product.id,
      },
    });
    return auction;
  } catch (error) {
    console.log(error);
    return null;
  }
}
