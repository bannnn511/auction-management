import { Buyers } from '../../../../models/index';

export async function requestingUpdatedInfo(buyer) {
  try {
    let newbuyer = await Buyers.update(
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
    newbuyer = await Buyers.findOne({
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
