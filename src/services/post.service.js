const { Post } = require('../models');

const getPostById = async (id) => {
  return Post.findById(id);
};

const updateById = async (id, body) => {
  const post = await Post.findByIdAndUpdate(id, body);
  return post;
};

const getListPost = async () => {
  return Post.find({});
};

module.exports = {
  getPostById,
  updateById,
  getListPost,
};
