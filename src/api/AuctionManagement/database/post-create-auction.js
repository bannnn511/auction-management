const db = require('../../../../models');

export async function createAuction(auction, transaction) {
  try {
    return await db.AuctionManagements.create(
      {
        sellerId: auction.sellerId,
        productId: auction.productId,
        description: auction.description,
        createdBy: auction.createdBy,
        updatedBy: auction.updatedBy,
        endAt: auction.endAt,
      },
      { transaction },
    );
  } catch (error) {
    console.log(error);
    return null;
  }
}
