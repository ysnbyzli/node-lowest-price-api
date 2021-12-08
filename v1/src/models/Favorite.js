const Mongoose = require("mongoose");

const FavoriteSchema = new Mongoose.Schema(
  {
    user: { type: Mongoose.Types.ObjectId, ref: "users" },
    product: { type: Mongoose.Types.ObjectId, ref: "products" },
  },
  { versionKey: false, timestamps: true }
);

module.exports = Mongoose.model("favorites", FavoriteSchema);
