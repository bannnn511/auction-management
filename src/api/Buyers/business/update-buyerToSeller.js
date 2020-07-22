import { Buyers } from '../../../../models/index';
import { UserIsSeller, UserStatus } from '../../../shared/helpers/constant';

export async function requestingToBeSeller(id, updatedBy) {
  try {
    let buyer = await Buyers.update(
      { isSeller: UserIsSeller.PENDING, updatedBy },
      {
        where: {
          id,
        },
      },
    );
    buyer = await Buyers.findOne({
      attribute: ['id', 'email', 'fullName', 'type', 'status'],
      where: {
        id,
        status: UserStatus.ACTIVE,
      },
    });
    return buyer;
  } catch (error) {
    console.log(error);
    return null;
  }
}
