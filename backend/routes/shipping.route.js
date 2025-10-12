const router = require("express").Router();
const {
  getShipping,
  addShipping,
  removeShipping,
} = require("../controllers/shipping.controller.js");

const verifyToken = require("../middleware/verifyToken.js");

router.get("/", verifyToken, getShipping);
router.post("/add", verifyToken, addShipping);
router.post("/remove", verifyToken, removeShipping);

module.exports = router;
