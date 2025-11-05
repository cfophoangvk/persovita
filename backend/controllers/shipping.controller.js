const fs = require("fs");
const path = require("path");

const dbPath = path.resolve(process.cwd(), "db/database.json");

const getShipping = async (req, res) => {
  try {
    const raw = await fs.promises.readFile(dbPath, "utf-8");
    const db = JSON.parse(raw);
    // If the request is unauthenticated, treat userId as null for guest addresses
    const userId = typeof req.id === "undefined" ? null : req.id;
    const shipping = (db.shipping || []).filter((s) => s.userId === userId);
    return res
      .status(200)
      .json({ success: true, shipping, count: shipping.length });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const addShipping = async (req, res) => {
  const { address, email, phone, method } = req.body;
  try {
    const raw = await fs.promises.readFile(dbPath, "utf-8");
    const db = JSON.parse(raw);
    const userId = typeof req.id === "undefined" ? null : req.id;
    db.shipping = db.shipping || [];
    // normalize for comparison
    const norm = (s) => (s || "").toString().trim().toLowerCase();
    const existing = db.shipping.find(
      (s) =>
        s.userId === userId &&
        ((address && s.address && norm(s.address) === norm(address)) ||
          (s.email && email && norm(s.email) === norm(email)) ||
          (s.phone && phone && norm(s.phone) === norm(phone)))
    );

    let record;
    if (existing) {
      record = existing;
    } else {
      record = createShipping(db, userId, {
        address,
        email,
        phone,
        method,
      });
    }
    await fs.promises.writeFile(dbPath, JSON.stringify(db, null, 2));
    return res.status(201).json({ success: true, shipping: record });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const removeShipping = async (req, res) => {
  const { address } = req.body;
  try {
    const raw = await fs.promises.readFile(dbPath, "utf-8");
    const db = JSON.parse(raw);
    const userId = typeof req.id === "undefined" ? null : req.id;
    db.shipping = (db.shipping || []).filter(
      (item) => !(item.userId === userId && item.address === address)
    );
    await fs.promises.writeFile(dbPath, JSON.stringify(db, null, 2));
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getShipping,
  addShipping,
  removeShipping,
  createShipping,
};

// Helper function: create a shipping record inside an existing db object and return it
function createShipping(db, userId, shipping) {
  db.shipping = db.shipping || [];
  const newId = db.shipping.length
    ? Math.max(...db.shipping.map((s) => s.id || 0)) + 1
    : 1;
  const record = { id: newId, userId, ...shipping };
  db.shipping.push(record);
  return record;
}
