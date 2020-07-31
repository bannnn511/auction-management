import * as _ from 'lodash';

export function responseSuccess(res, data, status) {
  console.log('Tota: ', data.length);
  return res
    .status(_.defaultTo(status, 200))
    .set({ 'x-total-count': data.length })
    .json(data);
}

export function responseError(res, error) {
  console.log('🔥🔥🔥', error);
  return res.status(400).json({ error });
}
