const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: { type: Number, required: true, index: true },
    productId: { type: mongoose.Schema.Types.Mixed, required: true },
    name: { type: String },
    price: { type: Number },
    quantity: { type: Number, default: 1 },
    subscription: { type: Boolean, default: false },
    subscriptionMonths: { type: Number, default: 0 },
    image: { type: String },
  },
  { timestamps: true }
);

// compound index for fast lookup by userId + productId
cartSchema.index({ userId: 1, productId: 1 });

module.exports = mongoose.model("Cart", cartSchema);
