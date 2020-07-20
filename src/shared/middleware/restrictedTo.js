export async function restrictedTo(req, res, next) {
  try {
    const type = req.body.currentUser.type;
    if (type === 'admin') {
      next();
    } else {
      console.log(req.body);
      res.status(400).send('Authority denied');
    }
  } catch (error) {
    console.log('Restricted error', error);
    res.status(500).send(error);
  }
}
