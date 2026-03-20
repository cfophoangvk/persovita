const mongoose = require("mongoose");

const productReviewSchema = new mongoose.Schema(
  {
    productId: { type: Number, required: true, index: true },
    reviewBy: { type: String, required: true },
    reviewDate: { type: String, required: true },
    stars: { type: Number, required: true, min: 1, max: 5 },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductReview", productReviewSchema);
