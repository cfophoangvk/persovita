const mongoose = require("mongoose");

const featureSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feature", featureSchema);
