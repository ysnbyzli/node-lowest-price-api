const Mongoose = require("mongoose");

const RecordSchema = new Mongoose.Schema(
  {
    product: { type: Mongoose.Schema.Types.ObjectId, ref: "products" },
    user: { type: Mongoose.Schema.Types.ObjectId, ref: "users" },
    price: { type: Number },
  },
  { versionKey: false, timestamps: true }
);

module.exports = Mongoose.model("records", RecordSchema);
