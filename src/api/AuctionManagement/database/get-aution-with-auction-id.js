const db = require('../../../../models');

export async function getAuctionWithAuctionId(id) {
  return db.AuctionManagements.findOne({
    where: {
      id,
    },
  });
}
