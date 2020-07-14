const { Comment } = require('../../../models');

exports.getAllComments = async (req, res, next) => {
  // FIND ALL COMMENTS
  const comments = await Comment.findAll();

  // FIND ALL COMMENTs OF SPECIFIC USER
  // const comments = await Comment.findAll({
  //   where: {
  //     userId: '14436fc5-be4e-46ae-a982-40c1f8e1cc33',
  //   },
  // });

  // FIND DETAIL
  // const comments = await Comment.findByPk(
  //   '5761b99f-f3fb-47f5-a3a5-15d688ad82ca'
  // );

  res.status(200).json({ comments });
};

exports.createNewComment = async (req, res, next) => {
  const comment = Comment.build(req.body);
  comment.userId = '1e99e81f-3402-4d05-829f-dbea0aabec10';
  await comment.save();

  res.status(201).json({ comment });
};
