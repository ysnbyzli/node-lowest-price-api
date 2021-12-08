const Favorite = require("../models/Favorite");

const list = (where = {}) => {
  return Favorite.find(where).populate({
    path: "product",
    select: "title image",
  });
};

const getOneFavoriteItemByFilter = (where) => {
  return Favorite.findOne(where);
};

const insert = (body) => {
  const favorite = new Favorite(body);
  return favorite.save();
};

const remove = (id) => {
  return Favorite.findByIdAndDelete(id);
};

module.exports = {
  list,
  insert,
  remove,
  getOneFavoriteItemByFilter,
};
