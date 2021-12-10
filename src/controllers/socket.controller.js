const { messageService } = require('../services');

const createMessage = async (data) => {
  messageService.createMessage(data);
};
module.exports = {
  createMessage,
};
