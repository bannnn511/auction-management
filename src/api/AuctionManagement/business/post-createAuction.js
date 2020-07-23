import { AuctionManagement } from '../../../../models/index';

export function createAuction(auction) {
  try {
    const newAuction = AuctionManagement.create({
      sellerID: auction.sellerId,
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
