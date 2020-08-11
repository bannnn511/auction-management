const db = require('../../../../models');

export async function updateAuctionBuyerId(data) {
  try {
    await db.AuctionManagements.update(
      { buyerId: data.userId },
      {
        where: {
          productId: data.productId,
        },
      },
    );
    return await db.AuctionManagements.findOne({
      where: {
        id: data.auctionId,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
}
