const db = require('../../../../models');

export async function ratingUser(
  auctionId,
  raterId,
  ratedId,
  point,
  description,
  createdBy,
  updatedBy,
) {
  try {
    const rating = db.Ratings.create({
      raterId,
      ratedId,
      description,
      auctionId,
      point,
      createdBy,
      updatedBy,
    });
    return rating;
  } catch (error) {
    console.log(error);
    return null;
  }
}
