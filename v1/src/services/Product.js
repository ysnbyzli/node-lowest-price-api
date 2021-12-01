const Product = require("../models/Product");

const list = (where = {}) => {
  return Product.find(where).populate({
    path: "user_id",
    select: "username",
  });
};

const getOneProductByFilter = (where) => {
  return Product.findOne(where).populate({
    path: "user_id",
    select: "username",
  });
};

const insert = (data) => {
  const product = new Product(data);
  return product.save();
};

const modify = (where, data) => {
  return Product.findOneAndUpdate(where, data, { new: true });
};

const deleteProduct = (id) => {
  return Product.findByIdAndDelete(id);
};

module.exports = {
  list,
  getOneProductByFilter,
  insert,
  modify,
  deleteProduct,
};
