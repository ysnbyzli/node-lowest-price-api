const Mongoose = require("mongoose");

const ProductSchema = new Mongoose.Schema(
  {
    title: { type: String },
    barcod: { type: String, unique: true },
    image: { type: String },
    price: { type: Number },
    user_id: { type: Mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model("products", ProductSchema);
