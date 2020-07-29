const db = require('../../../../models');

export async function ratingUser(
  auctionId,
  raterId,
  ratedId,
  point,
  description,
) {
  try {
    const rating = db.Ratings.create({
      raterId,
      ratedId,
      description,
      auctionId,
      point,
    });
    return rating;
  } catch (error) {
    console.log(error);
    return null;
  }
}
