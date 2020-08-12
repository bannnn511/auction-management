import * as _ from 'lodash';

export function serializeRating(rating) {
  if (rating) {
    return {
      raterId: _.get(rating, 'raterId', ''),
      ratedId: _.get(rating, 'ratedId', ''),
      auctionId: _.get(rating, 'auctionId', ''),
      description: _.get(rating, 'description', ''),
      point: _.get(rating, 'point', ''),
    };
  }
  return null;
}
