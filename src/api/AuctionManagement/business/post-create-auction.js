const db = require('../../../../models');

export function createAuction(auction) {
  try {
    const newAuction = db.AuctionManagements.create({
      sellerId: auction.sellerId,
      productId: auction.productId,
      description: auction.description,
      createdBy: auction.createdBy,
      updatedBy: auction.updatedBy,
    });
    return newAuction;
  } catch (error) {
    console.log(error);
    return null;
  }
}
