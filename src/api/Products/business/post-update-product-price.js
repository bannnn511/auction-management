const db = require('../../../../models');

export async function updateProductPrice(body) {
  try {
    let product = await db.Products.update(
      {
        price: body.price,
        updatedBy: body.updatedBy,
      },
      {
        where: {
          id: body.id,
        },
      },
    );
    product = await db.Products.findOne({
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
