const { User } = require("../models");

const createUser = async (email, password) => {
  return await User.create({ email, password });
};

const getUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

module.exports = { createUser, getUserByEmail };
