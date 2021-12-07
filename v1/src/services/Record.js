const Record = require("../models/Record");

const list = (where = {}) => {
  return Record.find(where)
    .sort({ createdAt: -1 })
    .populate({
      path: "user",
      select: "username profile_image",
    })
    .populate({
      path: "product",
      select: "title",
    });
};

const insert = (data) => {
  const record = new Record(data);
  return record.save();
};

module.exports = {
  list,
  insert,
};
