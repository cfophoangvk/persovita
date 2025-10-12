const router = require("express").Router();
const {
  createOrder,
  getOrders,
} = require("../controllers/order.controller.js");
const verifyToken = require("../middleware/verifyToken.js");

router.post("/create", verifyToken, createOrder);
router.get("/", verifyToken, getOrders);

module.exports = router;
