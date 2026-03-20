const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.Mixed },
    name: { type: String },
    price: { type: Number },
    quantity: { type: Number, default: 1 },
    image: { type: String },
    subscription: { type: Boolean, default: false },
    subscriptionMonths: { type: Number, default: 0 },
    subscriptionStart: { type: String },
    subscriptionEnd: { type: String },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    userId: { type: Number, default: null, index: true },
    items: [orderItemSchema],
    shippingId: { type: Number, default: null },
    shippingMethod: { type: String, default: null },
    shippingMethodCost: { type: Number, default: 0 },
    shippingBase: { type: Number, default: 30000 },
    paymentId: { type: Number, default: null },
    total: { type: Number, default: 0 },
    status: { type: String, default: "success" },
    guest: { type: Boolean, default: false },
    guestShipping: { type: mongoose.Schema.Types.Mixed },
    guestPayment: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
