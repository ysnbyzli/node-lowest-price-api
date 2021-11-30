const Mongoose = require("mongoose");

const UserSchema = new Mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    username: { type: String, unique: true },
    password: { type: String },
    profile_image: { type: String },
    email: { type: String, unique: true },
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model("users", UserSchema);
