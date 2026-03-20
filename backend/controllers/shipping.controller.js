const Shipping = require("../models/Shipping");

// Helper: get next auto-increment id
const getNextShippingId = async () => {
  const last = await Shipping.findOne().sort({ id: -1 }).lean();
  return last ? last.id + 1 : 1;
};

const getShipping = async (req, res) => {
  try {
    const userId = typeof req.id === "undefined" ? null : req.id;
    const shipping = await Shipping.find({ userId }).lean();
    return res
      .status(200)
      .json({ success: true, shipping, count: shipping.length });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const addShipping = async (req, res) => {
  const { address, name, email, alternativeName, phone, method, price } =
    req.body;

  try {
    const userId = typeof req.id === "undefined" ? null : req.id;

    const norm = (s) => (s || "").toString().trim().toLowerCase();

    const existing = await Shipping.findOne({
      userId,
      $or: [
        ...(address ? [{ address: { $regex: new RegExp(`^${norm(address).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') } }] : []),
        ...(email ? [{ email: { $regex: new RegExp(`^${norm(email).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') } }] : []),
        ...(phone ? [{ phone: { $regex: new RegExp(`^${norm(phone).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') } }] : []),
      ],
    });

    let record;

    if (existing) {
      existing.name = name;
      existing.alternativeName = alternativeName;
      existing.method = method;
      existing.price = price;
      await existing.save();
      record = existing.toObject();
    } else {
      const newId = await getNextShippingId();
      record = await Shipping.create({
        id: newId,
        userId,
        address,
        name,
        email,
        alternativeName,
        phone,
        method,
        price,
      });
      record = record.toObject();
    }

    return res.status(201).json({ success: true, shipping: record });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const removeShipping = async (req, res) => {
  const { address } = req.body;
  try {
    const userId = typeof req.id === "undefined" ? null : req.id;
    await Shipping.deleteOne({ userId, address });
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Helper function: create a shipping record (used by order controller)
async function createShippingRecord(userId, shipping) {
  const newId = await getNextShippingId();
  const record = await Shipping.create({
    id: newId,
    userId,
    ...shipping,
  });
  return record.toObject();
}

module.exports = {
  getShipping,
  addShipping,
  removeShipping,
  createShipping: createShippingRecord,
};
