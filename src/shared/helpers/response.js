export function responseSuccess(res, data) {
  return res.json(res, { data });
}

export function responseError(res, error) {
  return res.status(400).json({ error });
}
