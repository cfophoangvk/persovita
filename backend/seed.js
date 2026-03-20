/**
 * Seed script: Import dữ liệu từ database.json vào MongoDB
 *
 * Cách chạy:
 *   node seed.js
 *
 * Script sẽ:
 * 1. Kết nối tới MongoDB (đọc MONGODB_URI từ .env)
 * 2. Xóa toàn bộ dữ liệu cũ trong các collection
 * 3. Import lại toàn bộ dữ liệu từ database.json
 */

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

// Load .env
dotenv.config({ path: path.resolve(__dirname, ".env") });

// Import models
const Product = require("./models/Product");
const User = require("./models/User");
const Brand = require("./models/Brand");
const Feature = require("./models/Feature");
const ProductReview = require("./models/ProductReview");
const Cart = require("./models/Cart");
const Order = require("./models/Order");
const Shipping = require("./models/Shipping");
const Payment = require("./models/Payment");

// Read JSON data
const dbPath = path.resolve(__dirname, "db/database.json");
const rawData = fs.readFileSync(dbPath, "utf-8");
const data = JSON.parse(rawData);

const seed = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Đã kết nối MongoDB");

    // Clear all existing data
    console.log("🗑️  Đang xóa dữ liệu cũ...");
    await Promise.all([
      Product.deleteMany({}),
      User.deleteMany({}),
      Brand.deleteMany({}),
      Feature.deleteMany({}),
      ProductReview.deleteMany({}),
      Cart.deleteMany({}),
      Order.deleteMany({}),
      Shipping.deleteMany({}),
      Payment.deleteMany({}),
    ]);
    console.log("✅ Đã xóa dữ liệu cũ");

    // Seed Brands
    if (data.brands && data.brands.length) {
      await Brand.insertMany(data.brands);
      console.log(`✅ Đã import ${data.brands.length} brands`);
    }

    // Seed Features
    if (data.features && data.features.length) {
      await Feature.insertMany(data.features);
      console.log(`✅ Đã import ${data.features.length} features`);
    }

    // Seed Products
    if (data.products && data.products.length) {
      await Product.insertMany(data.products);
      console.log(`✅ Đã import ${data.products.length} products`);
    }

    // Seed Users
    if (data.users && data.users.length) {
      await User.insertMany(data.users);
      console.log(`✅ Đã import ${data.users.length} users`);
    }

    // Seed Product Reviews
    if (data.productReviews && data.productReviews.length) {
      await ProductReview.insertMany(data.productReviews);
      console.log(`✅ Đã import ${data.productReviews.length} product reviews`);
    }

    // Seed Carts
    if (data.carts && data.carts.length) {
      await Cart.insertMany(data.carts);
      console.log(`✅ Đã import ${data.carts.length} carts`);
    } else {
      console.log("ℹ️  Không có dữ liệu carts để import");
    }

    // Seed Orders
    if (data.orders && data.orders.length) {
      await Order.insertMany(data.orders);
      console.log(`✅ Đã import ${data.orders.length} orders`);
    }

    // Seed Shipping
    if (data.shipping && data.shipping.length) {
      await Shipping.insertMany(data.shipping);
      console.log(`✅ Đã import ${data.shipping.length} shipping records`);
    }

    // Seed Payment
    if (data.payment && data.payment.length) {
      await Payment.insertMany(data.payment);
      console.log(`✅ Đã import ${data.payment.length} payment records`);
    }

    console.log(
      "\n🎉 Seed hoàn tất! Tất cả dữ liệu đã được import vào MongoDB.",
    );
  } catch (error) {
    console.error("❌ Lỗi khi seed:", error);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Đã đóng kết nối MongoDB");
    process.exit(0);
  }
};

seed();
