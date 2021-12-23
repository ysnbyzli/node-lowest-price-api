const express = require("express");

const {
  index,
  create,
  login,
  update,
  getUserProductList,
  getUserRecordList,
  changePassword,
} = require("../controller/User");
const validate = require("../middlewares/validate");
const authenticate = require("../middlewares/authenticate");
const uploads = require("../middlewares/image");
const schema = require("../validations/User");

const router = express.Router();

router.route("/").get(index);
router.route("/").post(validate(schema.createValidation), create);
router.route("/login").post(validate(schema.loginValidation), login);
router.route("/").patch(authenticate, validate(schema.updateValidation), uploads.single("profile"), update);
router.route("/change-password").patch(authenticate, validate(schema.changePassword), changePassword);
router.route("/products").get(authenticate, getUserProductList);
router.route("/records").get(authenticate, getUserRecordList);

module.exports = router;
