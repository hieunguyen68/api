const catchAsync = require('../utils/catchAsync');
const { messageService } = require('../services');

const getMessageById = catchAsync(async (req, res) => {
  const messages = await messageService.getMessageById(req.params);
  res.send(messages);
});

const createMessage = catchAsync(async (req, res) => {
  const message = await messageService.createMessage(req.body);
  res.send(message);
});

module.exports = {
  getMessageById,
  createMessage,
};
