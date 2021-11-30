const User = require("../models/User");

const list = () => {
  return User.find({});
};

const getOneUserByFilter = (where) => {
  return User.findOne(where);
};

const insert = (data) => {
  const user = new User(data);
  return user.save();
};

const modify = (where, data) => {
  return User.findOneAndUpdate(where, data, { new: true });
};

module.exports = {
  list,
  getOneUserByFilter,
  insert,
  modify,
};
