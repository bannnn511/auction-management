import { Buyers } from '../../../../models/index';
import { UserType } from '../../../shared/helpers/constant';

export async function acceptBuyerReq(id) {
  try {
    let buyer = Buyers.update(
      { type: UserType.SELLER },
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
