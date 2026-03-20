const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Shipping = require("../models/Shipping");
const Payment = require("../models/Payment");
const { createShipping } = require("./shipping.controller");
const { createPayment } = require("./payment.controller");

// Helper: get next auto-increment id
const getNextOrderId = async () => {
  const last = await Order.findOne().sort({ id: -1 }).lean();
  return last ? last.id + 1 : 1;
};

// POST /api/orders/create
const createOrder = async (req, res) => {
  try {
    const { shipping = null, payment = null, items: bodyItems } = req.body;
    const userId = typeof req.id === "undefined" ? null : req.id;

    let items = [];
    if (userId === null) {
      items = Array.isArray(bodyItems) ? bodyItems : [];
      if (!items || items.length === 0) {
        return res
          .status(400)
          .json({ success: false, message: "Cart is empty" });
      }
    } else {
      const cartItems = await Cart.find({ userId }).lean();
      items = cartItems;
      if (!items || items.length === 0) {
        return res
          .status(400)
          .json({ success: false, message: "Cart is empty" });
      }
    }

    const newId = await getNextOrderId();

    // compute items total
    const itemsTotal = items.reduce((s, it) => {
      const price = Number(it.price || 0);
      const qty = Number(it.quantity || 1);
      const months = Number(it.subscriptionMonths || 0);
      if (months <= 0) return s + price * qty;
      const gross = price * qty * months;
      const multiplier = months === 1 ? 0.9 : 0.8;
      const net = gross * multiplier;
      return s + net;
    }, 0);

    const methodCost = shipping && shipping.price ? Number(shipping.price) : 0;
    const baseShipping = 30000;
    const total = itemsTotal + methodCost + baseShipping;

    // Persist shipping/payment
    let shippingId = null;
    let paymentId = null;

    if (userId !== null) {
      if (shipping) {
        const match = await Shipping.findOne({
          userId,
          $or: [
            ...(shipping.address ? [{ address: shipping.address }] : []),
            ...(shipping.city && shipping.country
              ? [{ city: shipping.city, country: shipping.country }]
              : []),
          ],
        });
        if (match) {
          shippingId = match.id;
        } else {
          const shipRecord = await createShipping(userId, shipping);
          shippingId = shipRecord.id;
        }
      }

      if (payment) {
        const payMatch = await Payment.findOne({
          userId,
          method: payment.method,
          info: payment.info,
        });
        if (payMatch) {
          paymentId = payMatch.id;
        } else {
          const payRecord = await createPayment(userId, payment);
          paymentId = payRecord.id;
        }
      }
    }

    // guest payment
    if (userId === null && payment) {
      const payMatch = await Payment.findOne({
        userId: null,
        method: payment.method,
        info: payment.info,
      });
      if (payMatch) {
        paymentId = payMatch.id;
      } else {
        const payRecord = await createPayment(null, payment);
        paymentId = payRecord.id;
      }
    }

    const orderItems = items.map((it) => {
      const item = {
        productId: it.productId,
        name: it.name,
        price: it.price,
        quantity: it.quantity,
        image: it.image,
        subscription: it.subscription,
        subscriptionMonths: it.subscriptionMonths || 0,
      };
      if (item.subscription && (item.subscriptionMonths || 0) > 0) {
        const start = new Date().toISOString();
        const end = new Date(start);
        end.setMonth(end.getMonth() + Number(item.subscriptionMonths));
        item.subscriptionStart = start;
        item.subscriptionEnd = end.toISOString();
      }
      return item;
    });

    const orderData = {
      id: newId,
      userId,
      items: orderItems,
      shippingId,
      shippingMethod: (shipping && shipping.method) || null,
      shippingMethodCost: methodCost,
      shippingBase: baseShipping,
      paymentId,
      total,
      status: "success",
    };

    if (userId === null) {
      orderData.guest = true;
      if (shipping) orderData.guestShipping = shipping;
      if (payment) orderData.guestPayment = payment;
    }

    const order = await Order.create(orderData);

    // clear cart for authenticated users
    if (userId !== null) {
      await Cart.deleteMany({ userId });
    }

    return res.status(201).json({ success: true, order: order.toObject() });
  } catch (err) {
    console.error("createOrder error", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/orders
const getOrders = async (req, res) => {
  try {
    const userId = typeof req.id === "undefined" ? null : req.id;
    const orders = await Order.find({ userId }).lean();
    return res.status(200).json({ success: true, orders });
  } catch (err) {
    console.error("getOrders error", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { createOrder, getOrders };
