//express.js: thư viện tạo web api
//nodemon: thư viện reload web api
//cors: thư viện gọi api phía frontend

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.route.js");
const productRoutes = require("./routes/product.route.js");
const cartRoutes = require("./routes/cart.route.js");
const shippingRoutes = require("./routes/shipping.route.js");
const paymentRoutes = require("./routes/payment.route.js");
const orderRoutes = require("./routes/order.route.js");
const featureRoutes = require("./routes/feature.route.js");
const brandRoutes = require("./routes/brand.route.js");
const dotenv = require("dotenv");

dotenv.config(); //load biến môi trường từ file .env

const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true })); //for fucking frontend app
app.use(cookieParser()); //for cookie
app.get("/", (req, res) => {
  res.send("<h2>Hello Express Web API</h2>");
});

app.get("/user", (req, res) => {
  res.send("Get user");
});

app.post("/user", (req, res) => {
  res.send("Get user");
});

app.put("/user", (req, res) => {
  res.send("Get user");
});

app.delete("/user", (req, res) => {
  res.send("Get user");
});

//Dùng database.json để lưu CSDL
app.get("/file", (req, res) => {
  fs.readFile("db/database.json", "utf8", (err, data) => {
    if (err) {
      res.send("Cannot read database.json");
      return;
    }
    res.send(JSON.parse(data));
  });
});

app.use("/api/auth", authRoutes); //mk là password123
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/shipping", shippingRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/features", featureRoutes);
app.use("/api/brands", brandRoutes);

const PORT = 6789;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
