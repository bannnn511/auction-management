import { Buyers } from '../../../../models/index';

export function getLoginUserById(id) {
  try {
    const buyer = Buyers.findOne({
      attributes: [
        'id',
        'email',
        'fullname',
        'type',
        'status',
        'createdBy',
        'updatedBy',
      ],
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
