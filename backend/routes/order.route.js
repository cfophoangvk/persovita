const router = require("express").Router();
const {
  createOrder,
  getOrders,
} = require("../controllers/order.controller.js");
const verifyToken = require("../middleware/verifyToken.js");

// allow guest users to create orders without authentication
router.post("/create", createOrder);
router.get("/", getOrders);

module.exports = router;
