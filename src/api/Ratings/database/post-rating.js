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
  return db.Ratings.create({
    raterId,
    ratedId,
    description,
    auctionId,
    point,
    createdBy,
    updatedBy,
  });
}
