const userRepo = require("../repositories/user.repository");
const bcrypt = require("bcrypt");

const register = async (email, password) => {
  const user = await userRepo.createUser(email, password);
  return user;
};

const login = async (email, password) => {
  const user = await userRepo.getUserByEmail(email);
  if (!user) {
    throw new Error("User not found");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new Error("Invalid password");
  }

  return user;
};

module.exports = { register, login };
