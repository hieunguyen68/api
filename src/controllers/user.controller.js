const httpStatus = require('http-status');
const path = require('path');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService, hrService } = require('../services');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const apply = catchAsync(async (req, res) => {
  const post = await hrService.findPost(req.body._id);
  req.body.candidates = [...post.candidates, req.body.userId];
  const updatedPost = await hrService.updatePost(req.body);
  res.send(updatedPost);
});

const updateUser = catchAsync(async (req, res) => {
  if (req.files.cv) req.body.cv = `${req.body.id}${path.extname(req.files.cv[0].originalname)}`;
  if (req.files.avatar) req.body.avatar = `${req.body.id}${path.extname(req.files.avatar[0].originalname)}`;
  const user = await userService.updateUser(req.body);
  res.send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  apply,
};
