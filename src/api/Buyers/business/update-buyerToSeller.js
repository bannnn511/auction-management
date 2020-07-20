import { Buyers } from '../../../../models/index';

export function requestingToBeSeller(id, updatedBy) {
  return Buyers.update(
    { isSeller: true, updatedBy: updatedBy },
    {
      where: {
        id: id,
      },
    }
  );
}
