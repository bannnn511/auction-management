const db = require('../../../../models');

export async function getAuctionWithProductId(id) {
  return db.AuctionManagements.findOne({
    where: {
      productId: id,
    },
  });
}
