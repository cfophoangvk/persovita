const fs = require("fs");
const path = require("path");
const { toASCII } = require("punycode");

const dbPath = path.resolve(process.cwd(), "db/database.json");

const readDb = async () => {
  const raw = await fs.promises.readFile(dbPath, "utf-8");
  return JSON.parse(raw || "{}");
};

const writeDb = async (db) => {
  await fs.promises.writeFile(dbPath, JSON.stringify(db, null, 2));
};

// POST /api/orders/create
const createOrder = async (req, res) => {
  try {
    const { shipping = null, payment = null } = req.body;
    const userId = req.id;
    const db = await readDb();

    const { createShipping } = require("./shipping.controller");
    const { createPayment } = require("./payment.controller");

    db.carts = db.carts || [];
    const items = db.carts.filter((c) => c.userId === userId);
    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    db.orders = db.orders || [];
    const newId = db.orders.length
      ? Math.max(...db.orders.map((o) => o.id)) + 1
      : 1;
    const itemsTotal = items.reduce(
      (s, it) => s + (it.price || 0) * (it.quantity || 1),
      0
    );

    // determine shipping costs: method cost (if provided) plus a base shipping fee
    const methodCost = shipping && shipping.price ? Number(shipping.price) : 0;
    const baseShipping = 30000; // default base fee
    const total = itemsTotal + methodCost + baseShipping;

    // Persist shipping/payment using the centralized helpers (they mutate db)
    let shippingId = null;
    if (shipping) {
      // try to reuse an existing shipping record for this user
      db.shipping = db.shipping || [];
      const match = db.shipping.find(
        (s) =>
          s.userId === userId &&
          ((shipping.address && s.address && s.address === shipping.address) ||
            (shipping.city &&
              s.city &&
              s.city === shipping.city &&
              shipping.country &&
              s.country &&
              s.country === shipping.country))
      );
      if (match) {
        shippingId = match.id;
      } else {
        const shipRecord = createShipping(db, userId, shipping);
        shippingId = shipRecord.id;
      }
    }

    let paymentId = null;
    if (payment) {
      // try to reuse existing payment record (match by method + info)
      db.payment = db.payment || [];
      const payMatch = db.payment.find(
        (p) =>
          p.userId === userId &&
          p.method === payment.method &&
          p.info === payment.info
      );
      if (payMatch) {
        paymentId = payMatch.id;
      } else {
        const payRecord = createPayment(db, userId, payment);
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
      // compute subscription end date if subscriptionMonths > 0
      if (item.subscription && (item.subscriptionMonths || 0) > 0) {
        const start = new Date().toISOString();
        const end = new Date(start);
        end.setMonth(end.getMonth() + Number(item.subscriptionMonths));
        item.subscriptionStart = start;
        item.subscriptionEnd = end.toISOString();
      }
      return item;
    });

    const order = {
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
      createdAt: new Date().toISOString(),
    };

    db.orders.push(order);

    // remove user's cart items
    db.carts = (db.carts || []).filter((c) => c.userId !== userId);

    await writeDb(db);
    return res.status(201).json({ success: true, order });
  } catch (err) {
    console.error("createOrder error", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/orders
const getOrders = async (req, res) => {
  try {
    const userId = req.id;
    const db = await readDb();
    db.orders = db.orders || [];
    const orders = db.orders.filter((o) => o.userId === userId);
    return res.status(200).json({ success: true, orders });
  } catch (err) {
    console.error("getOrders error", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { createOrder, getOrders };
