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
    const userId = req.id;
    db.payment = db.payment || [];
    const existing = db.payment.find(
      (p) => p.userId === userId && p.method === method && p.info === info
    );
    let record;
    if (existing) record = existing;
    else record = createPayment(db, userId, { method, info });
    await fs.promises.writeFile(dbPath, JSON.stringify(db, null, 2));
    return res.status(201).json({ success: true, payment: record });
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

function createPayment(db, userId, payment) {
  db.payment = db.payment || [];
  const newId = db.payment.length
    ? Math.max(...db.payment.map((p) => p.id || 0)) + 1
    : 1;
  const record = { id: newId, userId, ...payment };
  db.payment.push(record);
  return record;
}

module.exports = {
  getPayment,
  addPayment,
  removePayment,
  createPayment,
};
