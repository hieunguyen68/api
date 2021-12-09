const express = require('express');
const multer = require('multer');
const path = require('path');
const hrController = require('../../controllers/hr.controller');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads/post/');
  },
  filename(req, file, cb) {
    cb(null, req.body.id + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const router = express.Router();

router.route('/post').post(upload.single('image'), hrController.createPost);
router.route('/post/:hrEmail').get(hrController.getPostByEmail);
router.route('/approve').post(hrController.approve);
router.route('/:hrEmail').get(hrController.getHrByEmail);

module.exports = router;
