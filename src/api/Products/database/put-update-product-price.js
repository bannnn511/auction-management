const { Products } = require('../../../../models');

export async function updateProductPrice(body, t) {
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
        transaction: t,
      },
    );
    return await Products.findOne({
      where: {
        id: body.id,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
}
