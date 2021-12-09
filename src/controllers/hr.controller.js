const httpStatus = require('http-status');
const path = require('path');
const catchAsync = require('../utils/catchAsync');
const { hrService, postService } = require('../services');

const createPost = catchAsync(async (req, res) => {
  if (req.file) req.body.image = `${req.body.id}${path.extname(req.file.originalname)}`;
  const hr = await hrService.getHrByEmail(req.body.hrEmail);
  const post = await hrService.createPost({
    ...req.body,
    companyName: hr.companyName,
    companyLocation: hr.companyLocation,
    companyAddress: hr.companyAddress,
    website: hr.website,
    companyIntro: hr.companyIntro,
  });
  res.status(httpStatus.CREATED).send(post);
});

const getPostByEmail = catchAsync(async (req, res) => {
  const email = req.params.hrEmail;
  const post = await hrService.getPostByHrEmail(email);
  res.send(post);
});

const approve = catchAsync(async (req, res) => {
  const { postId, userId } = req.body;
  let post = await postService.getPostById(postId);
  const { hrEmail } = post;
  const hr = await hrService.getHrByEmail(hrEmail);
  const candidates = post.candidates.filter((i) => i !== userId);
  const listUser = [...hr.listUser, userId];
  post = await postService.updateById(postId, { candidates });
  await hrService.updateByEmail(hrEmail, { listUser });
  res.send(post);
});

const getHrByEmail = catchAsync(async (req, res) => {
  const { hrEmail } = req.params;
  const hr = await hrService.getHrByEmail(hrEmail);
  res.send(hr);
});

module.exports = {
  createPost,
  getPostByEmail,
  approve,
  getHrByEmail,
};
