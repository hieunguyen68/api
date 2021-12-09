const express = require('express');
const postController = require('../../controllers/post.controller');

const router = express.Router();

router.route('/:id').get(postController.getPostById);
router.route('/').get(postController.getListPost);

module.exports = router;
