const userRepository = require("../repositories/user.repository");

async function listAllUsers() {
  return await userRepository.listAllUsers();
}

async function signUp(userData) {
  return await userRepository.createUser(userData);
}

async function signIn(email) {
  return await userRepository.getUserByEmail(email);
}

module.exports = {
  listAllUsers,
  signUp,
  signIn,
};
