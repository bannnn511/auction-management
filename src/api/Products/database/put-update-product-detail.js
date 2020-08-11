import * as _ from 'lodash';

const { Products, AuctionManagements } = require('../../../../models');

export async function updateProductDetail(
  body,
  defaultProduct,
  defaultAuction,
) {
  try {
    await Products.update(
      {
        productName: _.defaultTo(body.productName, defaultProduct.productName),
        endAt: _.defaultTo(body.endAt, defaultProduct.endAt),
        updatedBy: _.defaultTo(body.updatedBy, defaultProduct.updatedBy),
        imgURL: _.defaultTo(body.imgURL, defaultProduct.imgURL),
      },
      {
        where: {
          id: body.productId,
        },
      },
    );

    await AuctionManagements.update(
      {
        description: _.defaultTo(body.description, defaultAuction.description),
        endAt: _.defaultTo(body.endAt, defaultAuction.endAt),
      },
      {
        where: {
          productId: body.productId,
        },
      },
    );

    return await Products.findOne({
      where: {
        id: body.productId,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
}
