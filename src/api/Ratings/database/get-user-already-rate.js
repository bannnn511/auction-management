const db = require('../../../../models');

export async function findUserAlreadyRate(auctionId, raterId) {
  return db.Ratings.findOne({
    where: {
      auctionId,
      raterId,
    },
  });
}
