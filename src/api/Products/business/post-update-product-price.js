const { Products } = require('../../../../models');

export async function updateProductPrice(body) {
  try {
    await Products.update(
      {
        currentPrice: body.price,
        updatedBy: body.updatedBy,
      },
      {
        where: {
          id: body.id,
        },
      },
    );
    return await Products.findOne({
      attribute: [
        'productName',
        'imgURL',
        'currentPrice',
        'buyNowPrice',
        'endAt',
      ],
      where: {
        id: body.id,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
}
