const mongoose = require("mongoose");

const activeIngredientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    amount: { type: String, default: "" },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true },
    brands: { type: Number, ref: "Brand" }, // brand id (single)
    features: [{ type: Number }], // array of feature ids
    amount: { type: mongoose.Schema.Types.Mixed, default: 30 },
    activeIngredients: [activeIngredientSchema],
    additiveIngredients: { type: String, default: "" },
    usage: { type: String, default: "" },
    contraindication: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
