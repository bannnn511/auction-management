const { serializePost } = require('./comment.serialize');

exports.getDetail = async () => {
  const posts = await Post.findAll();
  return posts.map((post) => serializePost(post));
};
exports.create = () => {};
