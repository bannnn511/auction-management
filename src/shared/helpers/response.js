export function responseSuccess(res, data) {
  return res.status(200).json(data);
}

export function responseError(res, error) {
  console.log(error);
  return res.status(400).json({ error });
}
