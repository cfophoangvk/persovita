const mongoose = require("mongoose");

const shippingSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    userId: { type: Number, default: null, index: true },
    address: { type: String, default: "" },
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    alternativeName: { type: String, default: "" },
    phone: { type: String, default: "" },
    method: { type: String, default: "" },
    price: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Shipping", shippingSchema);
