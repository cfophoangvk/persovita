const router = require("express").Router();
const {
  getPayment,
  addPayment,
  removePayment,
} = require("../controllers/payment.controller.js");

const verifyToken = require("../middleware/verifyToken.js");

router.get("/", verifyToken, getPayment);
router.post("/add", verifyToken, addPayment);
router.post("/remove", verifyToken, removePayment);

module.exports = router;
