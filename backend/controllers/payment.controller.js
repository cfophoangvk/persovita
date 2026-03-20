const Payment = require("../models/Payment");

// Helper: get next auto-increment id
const getNextPaymentId = async () => {
  const last = await Payment.findOne().sort({ id: -1 }).lean();
  return last ? last.id + 1 : 1;
};

const getPayment = async (req, res) => {
  try {
    const userId = req.id;
    const payment = await Payment.find({ userId }).lean();
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
    const userId = req.id;
    let record = await Payment.findOne({ userId, method, info });
    if (!record) {
      const newId = await getNextPaymentId();
      record = await Payment.create({ id: newId, userId, method, info });
    }
    return res.status(201).json({ success: true, payment: record.toObject() });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const removePayment = async (req, res) => {
  const { method } = req.body;
  try {
    const userId = req.id;
    await Payment.deleteOne({ userId, method });
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Helper function: create a payment record (used by order controller)
async function createPaymentRecord(userId, payment) {
  const newId = await getNextPaymentId();
  const record = await Payment.create({
    id: newId,
    userId,
    ...payment,
  });
  return record.toObject();
}

module.exports = {
  getPayment,
  addPayment,
  removePayment,
  createPayment: createPaymentRecord,
};
