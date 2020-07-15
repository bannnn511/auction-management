export async function getOverviewAdmin(req, res, next) {
  const myName = 'tu';
  res.status(200).render('admin-view/index', {
    title: 'All tours',
    myName,
  });
}

export async function getAllUsers() {}
