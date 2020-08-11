const db = require('../../../../models');

export async function createAuction(auction) {
  try {
    return await db.AuctionManagements.create({
      sellerId: auction.sellerId,
      productId: auction.productId,
      description: auction.description,
      createdBy: auction.createdBy,
      updatedBy: auction.updatedBy,
      endAt: auction.endAt,
    });
  } catch (error) {
    console.log(error);
    return null;
  }
}
