const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2;

module.exports = () => {
  dotenv.config();

  cloudinary.config({
    cloud_name: "hrms-camp",
    api_key: "454874475139721",
    api_secret: "a7umHa7065SWVqgHxe7I1qRUQHI",
  });
};
