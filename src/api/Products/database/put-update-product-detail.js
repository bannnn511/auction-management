const { Products } = require('../../../../models');

export async function updateProductDetail(body) {
  try {
    await Products.update(
      {
        productnname: body.productName,
        endAt: body.endAt,
        updatedBy: body.updatedBy,
      },
      {
        where: {
          id: body.id,
        },
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
