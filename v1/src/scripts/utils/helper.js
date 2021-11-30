const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;

const passwordToHash = (password) => {
  return CryptoJs.HmacSHA256(
    password,
    CryptoJs.HmacSHA1(password, process.env.PASSWORD_HASH).toString()
  ).toString();
};

const generateAccessToken = (user) => {
  return jwt.sign(
    { name: user.username, ...user },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    {
      expiresIn: "1w",
    }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { name: user.username, ...user },
    process.env.REFRESH_TOKEN_SECRET_KEY
  );
};

cloudinary.config({
  cloud_name: "hrms-camp",
  api_key: "454874475139721",
  api_secret: "a7umHa7065SWVqgHxe7I1qRUQHI",
});

module.exports = {
  passwordToHash,
  generateAccessToken,
  generateRefreshToken,
  cloudinary,
};
