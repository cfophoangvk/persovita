const router = require("express").Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} = require("../controllers/cart.controller.js");

router.get("/", getCart);
router.post("/add", addToCart);
router.post("/update", updateCartItem);
router.post("/remove", removeFromCart);
router.post("/clear", clearCart);

module.exports = router;
