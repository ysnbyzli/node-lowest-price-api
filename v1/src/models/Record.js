const Mongoose = require("mongoose");

const RecordSchema = new Mongoose.Schema({
  product_id: { type: Mongoose.Schema.Types.ObjectId, ref: "products" },
  user_id: { type: Mongoose.Schema.Types.ObjectId, ref: "users" },
  price: { type: Number },
});

module.exports = Mongoose.model("records", RecordSchema);
