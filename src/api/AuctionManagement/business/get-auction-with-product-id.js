const db = require('../../../../models');

export async function getAuctionWithProductId(id) {
  try {
    return await db.AuctionManagements.findOne({
      where: {
        productId: id,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
}
