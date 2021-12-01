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

const imageUploader = async (path, folder, id) => {
  try {
    return await cloudinary.uploader.upload(path, {
      folder: folder,
      public_id: id,
      width: 500,
      height: 500,
      crop: "fill",
      overwrite: true,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  passwordToHash,
  generateAccessToken,
  generateRefreshToken,
  cloudinary,
  imageUploader,
};
