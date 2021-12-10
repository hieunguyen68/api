const express = require('express');
const messageController = require('../../controllers/message.controller');

const router = express.Router();

router.route('/').post(messageController.createMessage);
router.route('/:hrEmail/:userId').get(messageController.getMessageById);

module.exports = router;
