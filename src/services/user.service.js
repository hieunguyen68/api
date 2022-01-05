const httpStatus = require('http-status');
const { User, Message } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (await User.isIdTaken(userBody.id)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'ID already taken');
  }
  return User.create(userBody);
};

const updateUser = async (userBody) => {
  const { id } = userBody;
  const user = await User.findOneAndUpdate(
    {
      id,
    },
    userBody
  );
  return user;
};

const getListUsersMessage = async (id) => {
  const messages = await Message.find({
    userId: id,
  });
  const users = [];
  messages.forEach((message) => {
    if (!users.includes(message.hrEmail)) users.push(message.hrEmail);
  });
  const list = new Array(users.length).fill(0);
  const response = await Promise.all(
    list.map((i, idx) =>
      Message.findOne(
        {
          userId: id,
          hrEmail: users[idx],
        },
        {},
        { sort: { createdAt: -1 } }
      )
    )
  );
  return response;
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findOne({ id });
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  updateUser,
  getListUsersMessage,
};
