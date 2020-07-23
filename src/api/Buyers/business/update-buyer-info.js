const db = require('../../../../models');

export async function requestingUpdatedInfo(buyer) {
  try {
    let newbuyer = await db.Buyers.update(
      {
        updatedBy: buyer.updatedBy,
        fullname: buyer.fullname,
        address: buyer.address,
      },
      {
        where: {
          id: buyer.id,
        },
      },
    );
    newbuyer = await db.Buyers.findOne({
      attribute: ['id', 'email', 'fullname', 'address', 'type', 'status'],
      where: {
        id: buyer.id,
      },
    });
    return newbuyer;
  } catch (error) {
    console.log(error);
    return null;
  }
}
