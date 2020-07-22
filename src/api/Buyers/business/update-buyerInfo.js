import { Buyers } from '../../../../models/index';

export async function requestingUpdatedInfo(id, updatedBy, fullName, address) {
  try {
    let buyer = await Buyers.update(
      { isSeller: false, updatedBy, fullName: fullName, address: address },
      {
        where: {
          id,
        },
      },
    );
    buyer = await Buyers.findOne({
      attribute: ['id', 'email', 'fullname', 'address', 'type', 'status'],
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
