const { Products } = require('../../../../models');

export async function updateProductPrice(body) {
  try {
    let product = await Products.update(
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
    product = await Products.findOne({
      attribute: [
        'productName',
        'imgUrl',
        'currentPrice',
        'buyNowPrice',
        'endAt',
      ],
      where: {
        id: body.id,
      },
    });
    return product;
  } catch (error) {
    console.log(error);
    return null;
  }
}
