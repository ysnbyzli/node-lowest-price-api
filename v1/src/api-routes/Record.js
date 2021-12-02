const express = require("express");
const { index, create } = require("../controller/Record");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.route("/").get(index);
router.route("/").post(authenticate, create);

module.exports = router;
