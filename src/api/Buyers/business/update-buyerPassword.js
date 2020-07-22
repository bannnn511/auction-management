import { Buyers } from '../../../../models/index';
import { UserStatus } from '../../../shared/helpers/constant';

export async function updateBuyerPassword(buyer) {
  try {
    let newBuyer = await Buyers.update(
      { password: buyer.password },
      { where: { id: buyer.id } },
    );
    newBuyer = await Buyers.findOne({
      attribute: ['id', 'email', 'fullName', 'type', 'status'],
      where: {
        id: buyer.id,
        status: UserStatus.ACTIVE,
      },
    });
    return newBuyer;
  } catch (error) {
    console.log(error);
    return null;
  }
}
