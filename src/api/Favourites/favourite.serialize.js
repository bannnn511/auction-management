import * as _ from 'lodash';

export function serializeFavouriteProduct(product) {
  return {
    userId: _.get(product, 'userId', ''),
    productId: _.get(product, 'productId', ''),
  };
}
