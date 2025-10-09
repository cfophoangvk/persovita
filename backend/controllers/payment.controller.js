const fs = require("fs");
const path = require("path");

const dbPath = path.resolve(process.cwd(), "db/database.json");

const getPayment = async (req, res) => {
  try {
    const raw = await fs.promises.readFile(dbPath, "utf-8");
    const db = JSON.parse(raw);
    const userId = req.id;
    const payment = (db.payment || []).filter((p) => p.userId === userId);
    return res
      .status(200)
      .json({ success: true, payment, count: payment.length });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const addPayment = async (req, res) => {
  const { method, info } = req.body;
  try {
    const raw = await fs.promises.readFile(dbPath, "utf-8");
    const db = JSON.parse(raw);
    db.payment = db.payment || [];
    const userId = req.id;
    db.payment.push({ userId, method, info });
    await fs.promises.writeFile(dbPath, JSON.stringify(db, null, 2));
    return res.status(201).json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const removePayment = async (req, res) => {
  const { method } = req.body;
  try {
    const raw = await fs.promises.readFile(dbPath, "utf-8");
    const db = JSON.parse(raw);
    const userId = req.id;
    db.payment = (db.payment || []).filter(
      (item) => !(item.userId === userId && item.method === method)
    );
    await fs.promises.writeFile(dbPath, JSON.stringify(db, null, 2));
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getPayment,
  addPayment,
  removePayment,
};
