import * as _ from 'lodash';

export function responseSuccess(res, data, status) {
  console.log('Total: ', _.defaultTo(data.length, 1));
  return res
    .status(_.defaultTo(status, 200))
    .set({ 'x-total-count': _.defaultTo(data.length, 1) })
    .json(data);
}

export function responseError(res, error) {
  console.log('🔥🔥🔥 Response Error: ', error);
  return res.status(error.status || 400).json({ error });
}
