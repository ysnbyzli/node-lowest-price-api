const express = require("express");

const { index, create, deleteFavorite } = require("../controller/Favorite");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.route("/").get(authenticate, index);
router.route("/").post(authenticate, create);
router.route("/:id").delete(authenticate, deleteFavorite);

module.exports = router;
