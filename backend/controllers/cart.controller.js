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
    const all = db.carts || [];
    const userId = req.id;
    const cart = all.filter((c) => c.userId === userId);
    return res.status(200).json({ success: true, cart });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/cart/add -> body: { productId, name, price, quantity, image, subscription }
// If item exists by productId for the user -> increment quantity, otherwise push
const addToCart = async (req, res) => {
  const {
    productId,
    id,
    name,
    price,
    quantity = 1,
    image,
    subscription = false,
  } = req.body;
  const pid = productId || id;
  if (!pid)
    return res
      .status(400)
      .json({ success: false, message: "productId (or id) is required" });
  try {
    const db = await readDb();
    db.carts = db.carts || [];
    const userId = req.id;
    // Find item for this user by product id
    const existing = db.carts.find(
      (c) => c.userId === userId && c.productId === pid
    );
    if (existing) {
      existing.quantity = (Number(existing.quantity) || 0) + Number(quantity);
    } else {
      db.carts.push({
        userId,
        productId: pid,
        name,
        price,
        quantity: Number(quantity),
        subscription,
        image,
      });
    }
    await writeDb(db);
    const cart = db.carts.filter((c) => c.userId === userId);
    return res.status(201).json({ success: true, cart });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/cart/update -> body: { id, quantity, subscription }
const updateCartItem = async (req, res) => {
  const { productId, id, quantity, subscription } = req.body;
  const pid = productId || id;
  if (!pid)
    return res
      .status(400)
      .json({ success: false, message: "productId (or id) is required" });
  try {
    const db = await readDb();
    db.carts = db.carts || [];
    const userId = req.id;
    const item = db.carts.find(
      (c) => c.userId === userId && c.productId === pid
    );
    if (!item)
      return res
        .status(404)
        .json({ success: false, message: "item not found" });
    if (quantity !== undefined) item.quantity = Number(quantity);
    if (subscription !== undefined) item.subscription = !!subscription;
    await writeDb(db);
    const cart = db.carts.filter((c) => c.userId === userId);
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
    const db = await readDb();
    const userId = req.id;
    db.carts = (db.carts || []).filter(
      (c) => !(c.userId === userId && c.productId === pid)
    );
    await writeDb(db);
    const cart = db.carts.filter((c) => c.userId === userId);
    return res.status(200).json({ success: true, cart });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/cart/clear
const clearCart = async (req, res) => {
  try {
    const db = await readDb();
    const userId = req.id;
    db.carts = (db.carts || []).filter((c) => c.userId !== userId);
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
