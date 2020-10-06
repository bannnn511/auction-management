const db = require('../../../../models');

export async function checkUserParticipateAuction(data) {
  return db.AuctionParticipating.findOne({
    where: {
      userId: data.userId,
      auctionId: data.auctionId,
    },
  });
}
