const db = require('../../../../models');

export async function findUserAlreadyRate(auctionId, raterId) {
  try {
    const user = db.Ratings.findOne({
      where: {
        auctionId,
        raterId,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}
