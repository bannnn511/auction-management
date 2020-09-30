const db = require('../../../../models');

export async function checkUserParticipateAuction(data) {
  return db.AuctionParticipating.findOne({
    userId: data.userId,
    auctionId: data.auctionId,
  });
}
