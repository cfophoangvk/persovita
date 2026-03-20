const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    userId: { type: Number, default: null, index: true },
    method: { type: String, default: "" },
    info: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
