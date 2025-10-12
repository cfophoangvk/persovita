const router = require("express").Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} = require("../controllers/cart.controller.js");

const verifyToken = require("../middleware/verifyToken.js");

router.get("/", verifyToken, getCart);
router.post("/add", verifyToken, addToCart);
router.post("/update", verifyToken, updateCartItem);
router.post("/remove", verifyToken, removeFromCart);
router.post("/clear", verifyToken, clearCart);

module.exports = router;
