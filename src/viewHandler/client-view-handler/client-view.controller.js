export async function getOverview(req, res, next) {
  const myName = 'tu';
  res.status(200).render('client-view/index', {
    title: 'All tours',
    myName,
  });
}

export async function middlewareA(req, res, next) {
  res.locals.age = 25;
  next();
}
