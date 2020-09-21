import * as _ from 'lodash';

export function serializeFavouriteProduct(product) {
  if (product) {
    return {
      userId: _.get(product, 'userId', ''),
      productId: _.get(product, 'productId', ''),
      categoryId: _.get(product, 'categoryId', ''),
      productName: _.get(product, 'products.productName', ''),
    };
  }
  return null;
}

export function serializeAllFavouriteProduct(products) {
  if (products) {
    const data = [];
    products.forEach((product) => {
      data.push(serializeFavouriteProduct(product));
    });
    return data;
  }
  return null;
}
