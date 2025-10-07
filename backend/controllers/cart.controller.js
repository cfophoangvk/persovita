const fs = require("fs");
const path = require("path");

const dbPath = path.resolve(process.cwd(), "db/database.json");

const readDb = async () => {
  const raw = await fs.promises.readFile(dbPath, "utf-8");
  return JSON.parse(raw || "{}");
};

const writeDb = async (db) => {
  await fs.promises.writeFile(dbPath, JSON.stringify(db, null, 2));
};

// GET /api/cart
const getCart = async (req, res) => {
  try {
    const db = await readDb();
    return res.status(200).json({ success: true, cart: db.carts || [] });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/cart/add -> body: { id, name, price, quantity, image, subscription }
// If item exists by id -> increment quantity (or set), otherwise push
const addToCart = async (req, res) => {
  const {
    id,
    name,
    price,
    quantity = 1,
    image,
    subscription = false,
  } = req.body;
  if (!id)
    return res.status(400).json({ success: false, message: "id is required" });
  try {
    const db = await readDb();
    db.carts = db.carts || [];
    const existing = db.carts.find((c) => c.id === id);
    if (existing) {
      existing.quantity = (Number(existing.quantity) || 0) + Number(quantity);
    } else {
      db.carts.push({
        id,
        name,
        price,
        quantity: Number(quantity),
        subscription,
        image,
      });
    }
    await writeDb(db);
    return res.status(201).json({ success: true, cart: db.carts });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/cart/update -> body: { id, quantity, subscription }
const updateCartItem = async (req, res) => {
  const { id, quantity, subscription } = req.body;
  if (!id)
    return res.status(400).json({ success: false, message: "id is required" });
  try {
    const db = await readDb();
    db.carts = db.carts || [];
    const item = db.carts.find((c) => c.id === id);
    if (!item)
      return res
        .status(404)
        .json({ success: false, message: "item not found" });
    if (quantity !== undefined) item.quantity = Number(quantity);
    if (subscription !== undefined) item.subscription = !!subscription;
    await writeDb(db);
    return res.status(200).json({ success: true, cart: db.carts });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/cart/remove -> body: { id }
const removeFromCart = async (req, res) => {
  const { id } = req.body;
  if (!id)
    return res.status(400).json({ success: false, message: "id is required" });
  try {
    const db = await readDb();
    db.carts = (db.carts || []).filter((c) => c.id !== id);
    await writeDb(db);
    return res.status(200).json({ success: true, cart: db.carts });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/cart/clear
const clearCart = async (req, res) => {
  try {
    const db = await readDb();
    db.carts = [];
    await writeDb(db);
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
