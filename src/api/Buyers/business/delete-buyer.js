import { Buyers } from '../../../../models/index';
import { UserStatus } from '../../../shared/helpers/constant';

export function deleteBuyer(id, updatedBy) {
  try {
    let buyer = Buyers.update(
      { status: UserStatus.DELETED, updatedBy },
      {
        where: {
          id,
        },
      },
    );
    buyer = Buyers.findOne({
      attribute: ['id', 'email', 'fullname', 'type', 'status'],
      where: {
        id,
      },
    });
    return buyer;
  } catch (error) {
    console.log(error);
    return null;
  }
}
