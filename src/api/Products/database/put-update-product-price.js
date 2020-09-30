const { Products } = require('../../../../models');

export async function updateProductPrice(body, t) {
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
  return Products.findOne({
    where: {
      id: body.id,
    },
  });
}
