import { Buyers } from '../../../../models/index';

export async function requestingBackToBuyer(id, updatedBy) {
    try {
      let buyer = await Buyers.update(
        { isSeller: false, updatedBy },
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
  