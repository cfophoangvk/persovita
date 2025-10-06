const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const generateTokenAndSetCookie = require("../utils/generateTokenAndSetCookie");
const { FRONTEND_URL } = require("../constants/constant.js");

const dbPath = path.resolve(process.cwd(), "db/database.json");

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email và mật khẩu là bắt buộc" });
  }

  try {
    const raw = await fs.promises.readFile(dbPath, "utf-8");
    const db = JSON.parse(raw);
    const user = db.users.find((u) => u.email === email);
    if (!user)
      return res
        .status(401)
        .json({ error: "Thông tin đăng nhập không hợp lệ" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res
        .status(401)
        .json({ error: "Thông tin đăng nhập không hợp lệ" });

    generateTokenAndSetCookie(res, user.id, user.email, user.role);

    const { password: _storedPassword, ...userSafe } = user;
    return res.status(200).json({
      success: true,
      message: "Đăng nhập thành công",
      user: userSafe,
    });
  } catch (err) {
    console.error("Lỗi ở login controller:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};
const signup = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email và mật khẩu là bắt buộc" });
  }
  if (typeof password !== "string" || password.length < 6) {
    return res
      .status(400)
      .json({ success: false, message: "Mật khẩu phải có ít nhất 6 ký tự" });
  }

  try {
    const raw = await fs.promises.readFile(dbPath, "utf-8");
    const db = JSON.parse(raw);

    const existing = db.users.find((u) => u.email === email);
    if (existing) {
      return res
        .status(409)
        .json({ success: false, message: "Email đã được sử dụng" });
    }

    const hashed = await bcrypt.hash(password, 12);
    const newId = db.users.length
      ? Math.max(...db.users.map((u) => u.id)) + 1
      : 1;
    const newUser = {
      id: newId,
      email,
      password: hashed,
      role: role || "user",
      createdAt: new Date().toISOString(),
    };

    db.users.push(newUser);
    await fs.promises.writeFile(dbPath, JSON.stringify(db, null, 2), "utf-8");

    generateTokenAndSetCookie(res, newUser.id, newUser.email, newUser.role);

    const { password: _storedPassword, ...userSafe } = newUser;
    return res.status(201).json({
      success: true,
      message: "Tạo tài khoản thành công",
      user: userSafe,
    });
  } catch (err) {
    console.error("Lỗi ở signup controller:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Đăng xuất thành công" });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email)
    return res
      .status(400)
      .json({ success: false, message: "Email là bắt buộc" });

  try {
    const raw = await fs.promises.readFile(dbPath, "utf-8");
    const db = JSON.parse(raw);
    const userIndex = db.users.findIndex((u) => u.email === email);
    if (userIndex === -1) {
      // Don't reveal whether email exists
      return res.status(200).json({
        success: true,
        message:
          "Nếu email tồn tại, bạn sẽ nhận được hướng dẫn để đặt lại mật khẩu",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expires = Date.now() + 60 * 60 * 1000; // 1 hour

    db.users[userIndex].resetToken = token;
    db.users[userIndex].resetTokenExpires = expires;

    await fs.promises.writeFile(dbPath, JSON.stringify(db, null, 2), "utf-8");

    const resetUrl = `${FRONTEND_URL}/reset-password/${token}`;

    // In production, send email here. For dev, log and return resetUrl.
    console.log(`Password reset link for ${email}: ${resetUrl}`);

    const responsePayload = {
      success: true,
      message:
        "Nếu email tồn tại, bạn sẽ nhận được hướng dẫn để đặt lại mật khẩu",
      resetUrl: resetUrl, // Chỉ để phát triển, xóa trong production
    };

    return res.status(200).json(responsePayload);
  } catch (err) {
    console.error("Lỗi ở forgotPassword:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;
  if (!token || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "Token, email và mật khẩu mới là bắt buộc",
    });
  }
  if (typeof newPassword !== "string" || newPassword.length < 6) {
    return res
      .status(400)
      .json({ success: false, message: "Mật khẩu phải có ít nhất 6 ký tự" });
  }

  try {
    const raw = await fs.promises.readFile(dbPath, "utf-8");
    const db = JSON.parse(raw);
    const userIndex = db.users.findIndex(
      (u) =>
        u.resetToken === token &&
        u.resetTokenExpires &&
        u.resetTokenExpires > Date.now()
    );

    if (userIndex === -1) {
      return res.status(400).json({
        success: false,
        message: "Token không hợp lệ hoặc đã hết hạn",
      });
    }

    const hashed = await bcrypt.hash(newPassword, 12);
    db.users[userIndex].password = hashed;
    delete db.users[userIndex].resetToken;
    delete db.users[userIndex].resetTokenExpires;

    await fs.promises.writeFile(dbPath, JSON.stringify(db, null, 2), "utf-8");

    // Optionally sign user in after reset
    generateTokenAndSetCookie(
      res,
      db.users[userIndex].id,
      db.users[userIndex].email,
      db.users[userIndex].role
    );

    const { password: _p, ...userSafe } = db.users[userIndex];
    return res.status(200).json({
      success: true,
      message: "Đặt lại mật khẩu thành công",
      user: userSafe,
    });
  } catch (err) {
    console.error("Lỗi ở resetPassword:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

const checkAuth = async (req, res) => {
  try {
    const raw = await fs.promises.readFile(dbPath, "utf-8");
    const db = JSON.parse(raw);

    const user = db.users.find((u) => u.id === req.id);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const { password, ...userSafe } = user;
    res.status(200).json({ success: true, user: userSafe });
  } catch (error) {
    console.log("Lỗi ở checkAuth controller", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  login,
  signup,
  logout,
  forgotPassword,
  resetPassword,
  checkAuth,
};
