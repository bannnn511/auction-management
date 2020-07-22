import { Buyers } from '../../../../models/index';
import { UserType } from '../../../shared/helpers/constant';

export async function requestingBackToBuyer(id, updatedBy) {
  try {
    let buyer = await Buyers.update(
      { isSeller: false, updatedBy, type: UserType.BUYER },
      {
        where: {
          id,
        },
      },
    );
    buyer = await Buyers.findOne({
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
