const express = require("express");

const {
  index,
  create,
  login,
  update,
  getUserProductList,
} = require("../controller/User");
const validate = require("../middlewares/validate");
const authenticate = require("../middlewares/authenticate");
const uploads = require("../middlewares/image");
const schema = require("../validations/User");

const router = express.Router();

router.route("/").get(index);
router.route("/").post(validate(schema.createValidation), create);
router.route("/login").post(validate(schema.loginValidation), login);
router
  .route("/")
  .patch(
    authenticate,
    validate(schema.updateValidation),
    uploads.single("profile"),
    update
  );
router.route("/products").get(authenticate, getUserProductList);
module.exports = router;
