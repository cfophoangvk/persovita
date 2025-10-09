const fs = require("fs");
const path = require("path");

const dbPath = path.resolve(process.cwd(), "db/database.json");

const getShipping = async (req, res) => {
  try {
    const raw = await fs.promises.readFile(dbPath, "utf-8");
    const db = JSON.parse(raw);
    const userId = req.id;
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
    db.shipping = db.shipping || [];
    const userId = req.id;
    db.shipping.push({ userId, address, email, phone, method });
    await fs.promises.writeFile(dbPath, JSON.stringify(db, null, 2));
    return res.status(201).json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const removeShipping = async (req, res) => {
  const { address } = req.body;
  try {
    const raw = await fs.promises.readFile(dbPath, "utf-8");
    const db = JSON.parse(raw);
    const userId = req.id;
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
};
