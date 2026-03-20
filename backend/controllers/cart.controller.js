const Cart = require("../models/Cart");

// GET /api/cart
const getCart = async (req, res) => {
  try {
    const userId = req.id;
    const cart = await Cart.find({ userId }).lean();
    return res.status(200).json({ success: true, cart });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/cart/add -> body: { productId, name, price, quantity, image, subscription, subscriptionMonths }
const addToCart = async (req, res) => {
  const {
    productId,
    id,
    name,
    price,
    quantity = 1,
    image,
    subscription = false,
    subscriptionMonths = 0,
  } = req.body;
  const pid = productId || id;
  if (!pid)
    return res
      .status(400)
      .json({ success: false, message: "productId (or id) is required" });
  try {
    const userId = req.id;
    const existing = await Cart.findOne({ userId, productId: pid });
    if (existing) {
      existing.quantity = (Number(existing.quantity) || 0) + Number(quantity);
      if (subscription !== undefined) existing.subscription = !!subscription;
      if (subscriptionMonths !== undefined)
        existing.subscriptionMonths = Number(subscriptionMonths) || 0;
      await existing.save();
    } else {
      await Cart.create({
        userId,
        productId: pid,
        name,
        price,
        quantity: Number(quantity),
        subscription,
        subscriptionMonths: Number(subscriptionMonths) || 0,
        image,
      });
    }
    const cart = await Cart.find({ userId }).lean();
    return res.status(201).json({ success: true, cart });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/cart/update -> body: { id, quantity, subscription, subscriptionMonths }
const updateCartItem = async (req, res) => {
  const { productId, id, quantity, subscription, subscriptionMonths } =
    req.body;
  const pid = productId || id;
  if (!pid)
    return res
      .status(400)
      .json({ success: false, message: "productId (or id) is required" });
  try {
    const userId = req.id;
    const item = await Cart.findOne({ userId, productId: pid });
    if (!item)
      return res
        .status(404)
        .json({ success: false, message: "item not found" });
    if (quantity !== undefined) item.quantity = Number(quantity);
    if (subscription !== undefined) item.subscription = subscription;
    if (subscriptionMonths !== undefined)
      item.subscriptionMonths = Number(subscriptionMonths) || 0;
    await item.save();
    const cart = await Cart.find({ userId }).lean();
    return res.status(200).json({ success: true, cart });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/cart/remove -> body: { id }
const removeFromCart = async (req, res) => {
  const { productId, id } = req.body;
  const pid = productId || id;
  if (!pid)
    return res
      .status(400)
      .json({ success: false, message: "productId (or id) is required" });
  try {
    const userId = req.id;
    await Cart.deleteOne({ userId, productId: pid });
    const cart = await Cart.find({ userId }).lean();
    return res.status(200).json({ success: true, cart });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/cart/clear
const clearCart = async (req, res) => {
  try {
    const userId = req.id;
    await Cart.deleteMany({ userId });
    return res.status(200).json({ success: true, cart: [] });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};
