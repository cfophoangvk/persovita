const router = require("express").Router();
const {
  getShipping,
  addShipping,
  removeShipping,
} = require("../controllers/shipping.controller.js");

// Shipping endpoints no longer require authentication by design.
// Guest users will have userId = null when not authenticated.
router.get("/", getShipping);
router.post("/add", addShipping);
router.post("/remove", removeShipping);

module.exports = router;
