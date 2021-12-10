const { Message } = require('../models');
const { hrService, userService } = require('./index');

const createMessage = async (message) => {
  const hr = await hrService.getHrByEmail(message.hrEmail);
  const user = await userService.getUserById(message.userId);
  return Message.create({
    ...message,
    hrName: hr.name,
    userName: user.name,
  });
};

const getMessageById = async ({ hrEmail, userId }) => {
  return Message.find({ hrEmail, userId });
};

module.exports = {
  createMessage,
  getMessageById,
};
