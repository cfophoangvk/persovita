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
    const { shipping = null, payment = null, items: bodyItems } = req.body;
    // allow unauthenticated (guest) orders: normalize undefined id to null
    const userId = typeof req.id === "undefined" ? null : req.id;
    const db = await readDb();

    const { createShipping } = require("./shipping.controller");
    const { createPayment } = require("./payment.controller");

    let items = [];
    if (userId === null) {
      // Guest order: expect items sent from frontend (e.g. localStorage persistCart)
      items = Array.isArray(bodyItems) ? bodyItems : [];
      if (!items || items.length === 0) {
        return res
          .status(400)
          .json({ success: false, message: "Cart is empty" });
      }
    } else {
      // Authenticated user: use server-side cart and persist changes
      db.carts = db.carts || [];
      items = db.carts.filter((c) => c.userId === userId);
      if (!items || items.length === 0) {
        return res
          .status(400)
          .json({ success: false, message: "Cart is empty" });
      }
    }

    db.orders = db.orders || [];
    const newId = db.orders.length
      ? Math.max(...db.orders.map((o) => o.id)) + 1
      : 1;
    // compute items total respecting subscriptionMonths and discounts
    const itemsTotal = items.reduce((s, it) => {
      const price = Number(it.price || 0);
      const qty = Number(it.quantity || 1);
      const months = Number(it.subscriptionMonths || 0);
      if (months <= 0) return s + price * qty;
      const gross = price * qty * months;
      const multiplier = months === 1 ? 0.9 : 0.8; // 1 month -> 0.9, >=3 -> 0.8
      const net = gross * multiplier;
      return s + net;
    }, 0);

    // determine shipping costs: method cost (if provided) plus a base shipping fee
    const methodCost = shipping && shipping.price ? Number(shipping.price) : 0;
    const baseShipping = 30000; // default base fee
    const total = itemsTotal + methodCost + baseShipping;

    // Persist shipping/payment using the centralized helpers (they mutate db)
    let shippingId = null;
    let paymentId = null;
    if (userId !== null) {
      if (shipping) {
        // try to reuse an existing shipping record for this user
        db.shipping = db.shipping || [];
        const match = db.shipping.find(
          (s) =>
            s.userId === userId &&
            ((shipping.address &&
              s.address &&
              s.address === shipping.address) ||
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
    }

    // If guest and provided payment, persist a payment record with userId = null
    if (userId === null && payment) {
      db.payment = db.payment || [];
      const payMatch = db.payment.find(
        (p) => p.userId === null && p.method === payment.method && p.info === payment.info
      );
      if (payMatch) {
        paymentId = payMatch.id;
      } else {
        const payRecord = createPayment(db, null, payment);
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

    // persist order for both authenticated and guest users
    db.orders = db.orders || [];
    // mark guest orders explicitly
    if (userId === null) {
      order.guest = true;
      if (shipping) order.guestShipping = shipping;
      if (payment) order.guestPayment = payment;
    }
    db.orders.push(order);

    // only remove server-side carts for authenticated users
    if (userId !== null) {
      db.carts = (db.carts || []).filter((c) => c.userId !== userId);
    }

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
    // allow unauthenticated (guest) orders: normalize undefined id to null
    const userId = typeof req.id === "undefined" ? null : req.id;
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
