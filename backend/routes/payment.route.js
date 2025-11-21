const router = require("express").Router();
const {
  getPayment,
  addPayment,
  removePayment,
} = require("../controllers/payment.controller.js");

const verifyToken = require("../middleware/verifyToken.js");

router.get("/", getPayment);
router.post("/add", addPayment);
router.post("/remove", removePayment);

module.exports = router;
