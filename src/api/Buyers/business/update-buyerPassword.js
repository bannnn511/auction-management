import { Buyers } from '../../../../models/index';

export async function updateBuyerPassword(buyer) {
  try {
    let newBuyer = await Buyers.update(
      { password: buyer.password },
      { where: { id: buyer.id } },
    );
    newBuyer = await Buyers.findOne({
      attribute: ['id', 'email', 'fullname', 'type', 'status'],
      where: {
        id: buyer.id,
      },
    });
    return newBuyer;
  } catch (error) {
    console.log(error);
    return null;
  }
}
