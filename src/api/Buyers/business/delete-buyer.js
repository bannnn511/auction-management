import { Buyers } from '../../../../models/index';

export function deleteBuyer(id, updatedBy) {
  return Buyers.update(
    { status: 'deleted', updatedBy: updatedBy },
    {
      where: {
        id: id,
      },
    }
  ).then(() => {
    console.log('Update done');
  });
}
