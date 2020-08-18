const db = require('../../../../models');

export async function createAuctionHistory(body, t) {
  try {
    return await db.AuctionHistories.create(
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
  } catch (error) {
    console.log(error);
    return null;
  }
}
