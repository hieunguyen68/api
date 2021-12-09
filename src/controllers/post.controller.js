const catchAsync = require('../utils/catchAsync');
const { postService } = require('../services');

const getPostById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const post = await postService.getPostById(id);
  res.send(post);
});

const getListPost = catchAsync(async (req, res) => {
  const post = await postService.getListPost();
  res.send(post);
});

module.exports = {
  getPostById,
  getListPost,
};
