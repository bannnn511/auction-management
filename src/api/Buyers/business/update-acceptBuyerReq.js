import { Buyers } from '../../../../models/index';
import { UserType, UserStatus } from '../../../shared/helpers/constant';

export async function acceptBuyerReq(id, updatedBy) {
  try {
    let buyer = Buyers.update(
      { type: UserType.SELLER },
      {
        where: {
          id,
          updatedBy,
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
