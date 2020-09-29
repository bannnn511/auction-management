const db = require('../../../../models');

export async function createAuctionHistory(body, t) {
  return db.AuctionHistories.create(
    {
      userId: body.userId,
      auctionId: body.auctionId,
      price: body.price,
      createdBy: body.createdBy,
      updatedBy: body.updatedBy,
    },
    {
      transaction: t,
    },
  );
}
