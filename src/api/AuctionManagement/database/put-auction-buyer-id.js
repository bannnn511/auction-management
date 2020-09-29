const db = require('../../../../models');

export async function updateAuctionBuyerId(data) {
  await db.AuctionManagements.update(
    { buyerId: data.userId },
    {
      where: {
        productId: data.productId,
      },
    },
  );
  return db.AuctionManagements.findOne({
    where: {
      id: data.auctionId,
    },
  });
}
