const db = require('../../../../models');

export async function updateAuctionBuyerId(data) {
  try {
    db.AuctionManagements.update(
      { buyerId: data.userId },
      {
        where: {
          productId: data.productId,
        },
      },
    );
    const auction = db.AuctionManagements.findOne({
      where: {
        id: data.auctionId,
      },
    });
    return auction;
  } catch (error) {
    console.log(error);
    return null;
  }
}
