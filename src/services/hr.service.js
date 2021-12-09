const { Post, Hr } = require('../models');

const createHr = async (body) => {
  return Hr.create(body);
};

const createPost = async (body) => {
  return Post.create(body);
};

const updatePost = async (body) => {
  return Post.findByIdAndUpdate(body._id, body, {
    new: true,
  });
};

const findPost = async (_id) => {
  return Post.findById(_id);
};

const getPostByHrEmail = async (email) => {
  return Post.find({
    hrEmail: email,
  });
};

const getHrByEmail = async (email) => {
  return Hr.findOne({ email });
};

const updateByEmail = async (email, body) => {
  return Hr.findOneAndUpdate({ email }, body);
};

module.exports = {
  createPost,
  updatePost,
  findPost,
  createHr,
  getPostByHrEmail,
  getHrByEmail,
  updateByEmail,
};
