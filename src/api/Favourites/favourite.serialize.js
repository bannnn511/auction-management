import * as _ from 'lodash';

export function serializeFavouriteProduct(product) {
  return {
    userId: _.get(product, 'userId', ''),
    productId: _.get(product, 'productId', ''),
    productName: _.get(product, 'productName', ''),
  };
}

export function serializeAllFavouriteProduct(products) {
  const data = [];
  products.forEach((product) => {
    data.push(serializeFavouriteProduct(product));
  });
  return data;
}
