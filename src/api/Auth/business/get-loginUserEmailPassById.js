import { Buyers } from '../../../../models/index';
import { UserStatus } from '../../../shared/helpers/constant';

export function getLoginUserById(id) {
  try {
    const buyer = Buyers.findOne({
      attributes: [
        'id',
        'email',
        'fullName',
        'type',
        'status',
        'createdBy',
        'updatedBy',
      ],
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
