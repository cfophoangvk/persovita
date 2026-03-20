const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    fullName: { type: String, default: "" },
    email: { type: String, required: true, unique: true },
    password: { type: String, default: "" },
    role: { type: String, default: "user" },
    picture: { type: String, default: "" },
    phone: { type: String, default: "" },
    address: { type: String, default: "" },
    // email verification fields
    isVerified: { type: Boolean, default: false },
    emailVerifyToken: { type: String },
    emailVerifyExpires: { type: Number },
    // password reset fields
    resetToken: { type: String },
    resetTokenExpires: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
