const express = require("express");
const { index, create } = require("../controller/Record");
const authenticate = require("../middlewares/authenticate");
const validate = require("../middlewares/validate");
const schemas = require("../validations/Record");

const router = express.Router();

router.route("/").get(index);
router
  .route("/")
  .post(authenticate, validate(schemas.createValidation), create);

module.exports = router;
