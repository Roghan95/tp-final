const { models } = require("../../config/db");
const User = models.User;

async function listAllUsers() {
  const users = await User.findAll();
  return users;
}

async function createUser(userData) {
  return await User.create(userData);
}

module.exports = {
  listAllUsers,
  createUser,
};
