const db = require('../../../../models');

export async function createAuctionHistory(body) {
  try {
    const history = await db.AuctionHistories.create({
      userId: body.userId,
      auctionId: body.auctionId,
      price: body.price,
      createdBy: body.createdBy,
      updatedBy: body.updatedBy,
    });
    return history;
  } catch (error) {
    console.log(error);
    return null;
  }
}
