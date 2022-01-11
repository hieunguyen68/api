const httpStatus = require('http-status');
const { Post, Hr, Message } = require('../models');
const ApiError = require('../utils/ApiError');

const updatePostById = async (_id, body) => {
  return Post.findByIdAndUpdate(_id, body);
};

const createHr = async (body) => {
  return Hr.create(body);
};

const createPost = async (body) => {
  return Post.create(body);
};

const deletePost = async (_id) => {
  return Post.findByIdAndRemove(_id);
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

const login = async (email, password) => {
  const hr = await getHrByEmail(email);
  if (!hr || !(await hr.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  return hr;
};

const getListUsersMessage = async (hrEmail) => {
  const messages = await Message.find({
    hrEmail,
  });
  const users = [];
  messages.forEach((message) => {
    if (!users.includes(message.userId)) users.push(message.userId);
  });
  const list = new Array(users.length).fill(0);
  const response = await Promise.all(
    list.map((i, idx) =>
      Message.findOne(
        {
          hrEmail,
          userId: users[idx],
        },
        {},
        { sort: { createdAt: -1 } }
      )
    )
  );
  return response;
};

module.exports = {
  createPost,
  updatePost,
  findPost,
  createHr,
  getPostByHrEmail,
  getHrByEmail,
  updateByEmail,
  login,
  updatePostById,
  deletePost,
  getListUsersMessage,
};
