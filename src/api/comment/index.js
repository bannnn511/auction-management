const { Router } = require('express');
const { getAllComments, createNewComment } = require('./comment.controller');

const commentRouter = Router();

commentRouter.route('/').get(getAllComments).post(createNewComment);

module.exports = {
  commentRouter,
};
