const Record = require("../models/Record");

const list = (where = {}) => {
  return Record.find(where)
    .populate({
      path: "user_id",
      select: "username",
    })
    .populate({
      path: "product_id",
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
