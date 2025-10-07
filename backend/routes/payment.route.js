const router = require("express").Router();
const {
  getPayment,
  addPayment,
  removePayment,
} = require("../controllers/payment.controller.js");

router.get("/", getPayment);
router.post("/add", addPayment);
router.post("/remove", removePayment);

module.exports = router;
