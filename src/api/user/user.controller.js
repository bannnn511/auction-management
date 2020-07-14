import { User, Comment } from '../../../models';
import { getUserByEmail } from './business';
import { sequelizeUser } from './user.sequelize';

export async function getAllUsers(req, res, next) {
  // const users = await User.findAll({});

  // const users = await User.findByPk('1e99e81f-3402-4d05-829f-dbea0aabec10');

  // const users = await User.findOne({
  //   where: {
  //     id: '14436fc5-be4e-46ae-a982-40c1f8e1cc33',
  //   },
  //   include: [
  //     {
  //       model: Comment,
  //       as: 'comments',
  //       attributes: ['id', 'content'],
  //     },
  //   ],
  // });

  const user = await getUserByEmail('test@test.test');
  const userResponse = sequelizeUser(user);

  res.status(200).json({ user });
}

export async function createNewUser(req, res, next) {
  const user = await User.create(req.body);

  // const user = User.build(req.body);

  // await user.save();

  res.status(201).json({ user: sequelizeUser(user) });
}
