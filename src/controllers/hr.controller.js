const httpStatus = require('http-status');
const path = require('path');
const catchAsync = require('../utils/catchAsync');
const { hrService, postService, userService } = require('../services');

const getCandidates = catchAsync(async (req, res) => {
  const posts = await hrService.getPostByHrEmail(req.body.hrEmail);
  const candidates = [];
  await Promise.all(
    posts.map(async (post) => {
      const listCandidates = await Promise.all(post.candidates.map((i) => userService.getUserById(i)));
      listCandidates.forEach((i) => {
        candidates.push({
          post,
          user: i,
        });
      });
    })
  );
  res.send(candidates);
});

const getStudents = catchAsync(async (req, res) => {
  const posts = await hrService.getPostByHrEmail(req.body.hrEmail);
  const students = [];
  await Promise.all(
    posts.map(async (post) => {
      const listStudents = await Promise.all(post.approves.map((i) => userService.getUserById(i)));
      listStudents.forEach((i) => {
        students.push({
          post,
          user: i,
        });
      });
    })
  );
  res.send(students);
});

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

const updatePost = catchAsync(async (req, res) => {
  if (req.file) req.body.image = `${req.body.id}${path.extname(req.file.originalname)}`;
  const post = await hrService.updatePostById(req.body._id, req.body);
  res.send(post);
});

const deletePost = catchAsync(async (req, res) => {
  const post = await hrService.deletePost(req.body._id);
  res.send(post);
});

const getPostByEmail = catchAsync(async (req, res) => {
  const email = req.params.hrEmail;
  const post = await hrService.getPostByHrEmail(email);
  res.send(post);
});

const approve = catchAsync(async (req, res) => {
  const { postId, userId } = req.body;
  let post = await postService.getPostById(postId);
  const candidates = post.candidates.filter((i) => i !== userId);
  const approves = [...post.approves, userId];
  post = await postService.updateById(postId, { candidates, approves });
  res.send(post);
});

const reject = catchAsync(async (req, res) => {
  const { postId, userId } = req.body;
  let post = await postService.getPostById(postId);
  const candidates = post.candidates.filter((i) => i !== userId);
  post = await postService.updateById(postId, { candidates });
  res.send(post);
});

const getHrByEmail = catchAsync(async (req, res) => {
  const { hrEmail } = req.params;
  const hr = await hrService.getHrByEmail(hrEmail);
  res.send(hr);
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const hr = await hrService.login(email, password);
  res.send(hr);
});

const updateHr = catchAsync(async (req, res) => {
  const hr = await hrService.updateByEmail(req.params.hrEmail, req.body);
  res.send(hr);
});

const getListUserMessage = catchAsync(async (req, res) => {
  const users = await hrService.getListUsersMessage(req.params.hrEmail);
  res.send(users);
});

module.exports = {
  createPost,
  getPostByEmail,
  approve,
  getHrByEmail,
  login,
  updatePost,
  deletePost,
  reject,
  getCandidates,
  getStudents,
  updateHr,
  getListUserMessage,
};
