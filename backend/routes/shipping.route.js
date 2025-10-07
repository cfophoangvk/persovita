const router = require("express").Router();
const {
  getShipping,
  addShipping,
  removeShipping,
} = require("../controllers/shipping.controller.js");

router.get("/", getShipping);
router.post("/add", addShipping);
router.post("/remove", removeShipping);

module.exports = router;
