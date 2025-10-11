const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const generateTokenAndSetCookie = require("../utils/generateTokenAndSetCookie");
// Ensure dotenv is loaded if not already (safe to call multiple times)
try {
  require("dotenv").config();
} catch (e) {
  // dotenv may not be installed in production; that's OK
}
const { FRONTEND_URL } = require("../constants/constant.js");

const dbPath = path.resolve(process.cwd(), "db/database.json");

const login = async (req, res) => {
  const { email, password, remember = false } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email và mật khẩu là bắt buộc" });
  }

  try {
    const raw = await fs.promises.readFile(dbPath, "utf-8");
    const db = JSON.parse(raw);
    const user = db.users.find((u) => u.email === email);
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Thông tin đăng nhập không hợp lệ" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res
        .status(401)
        .json({ success: false, message: "Thông tin đăng nhập không hợp lệ" });

    generateTokenAndSetCookie(res, user.id, user.email, user.role, remember);

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
      return res.status(400).json({
        success: false,
        message:
          "Email này hiện không tồn tại trong hệ thống, vui lòng kiểm tra lại",
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
        "Nếu email tồn tại, bạn sẽ nhận được hướng dẫn để đặt lại mật khẩu. Vui lòng kiểm tra hộp thư đến hoặc thư mục spam.",
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
      message: "Đặt lại mật khẩu thành công.",
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

const updateProfile = async (req, res) => {
  try {
    const { fullName, phone, address } = req.body;
    const raw = await fs.promises.readFile(dbPath, "utf-8");
    const db = JSON.parse(raw);
    const userIndex = db.users.findIndex((u) => u.id === req.id);
    if (userIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Update only allowed fields
    if (typeof fullName === "string") db.users[userIndex].fullName = fullName;
    if (typeof phone === "string") db.users[userIndex].phone = phone;
    if (typeof address === "string") db.users[userIndex].address = address;

    await fs.promises.writeFile(dbPath, JSON.stringify(db, null, 2), "utf-8");

    const { password, ...userSafe } = db.users[userIndex];
    return res.status(200).json({
      success: true,
      message: "Cập nhật hồ sơ thành công",
      user: userSafe,
    });
  } catch (err) {
    console.error("Lỗi ở updateProfile:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Google OAuth: redirect to Google's consent screen
const googleAuthRedirect = (req, res) => {
  const redirectUri = encodeURIComponent(
    `${req.protocol}://${req.get("host")}/api/auth/google/callback`
  );
  const scope = encodeURIComponent("openid email profile");
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(
    clientId
  )}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;
  res.redirect(url);
};

// Google OAuth callback
const googleAuthCallback = async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).send("No code provided");

  try {
    // Exchange code for tokens
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: `${req.protocol}://${req.get(
          "host"
        )}/api/auth/google/callback`,
        grant_type: "authorization_code",
      }),
    });
    const tokenJson = await tokenRes.json();
    if (tokenJson.error)
      throw new Error(tokenJson.error_description || tokenJson.error);

    // Get user info
    const profileRes = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${tokenJson.access_token}` },
      }
    );
    const profile = await profileRes.json();

    // Read DB and create/find user
    const raw = await fs.promises.readFile(dbPath, "utf-8");
    const db = JSON.parse(raw);
    let user = db.users.find((u) => u.email === profile.email);
    if (!user) {
      const newId = db.users.length
        ? Math.max(...db.users.map((u) => u.id)) + 1
        : 1;
      user = {
        id: newId,
        fullName: profile.name,
        email: profile.email,
        role: "user",
        picture: profile.picture,
        createdAt: new Date().toISOString(),
      };
      db.users.push(user);
      await fs.promises.writeFile(dbPath, JSON.stringify(db, null, 2), "utf-8");
    }

    // generate token and set cookie
    // honor optional remember flag (e.g. /api/auth/google?remember=true)
    const rememberFlag = String(req.query.remember || "false") === "true";
    generateTokenAndSetCookie(
      res,
      user.id,
      user.email,
      user.role,
      rememberFlag
    );

    // redirect to frontend
    res.redirect(FRONTEND_URL || "/");
  } catch (err) {
    console.error("Google OAuth error:", err);
    res.status(500).send("Google auth failed");
  }
};

// GOOGLE_CLIENT_ID = 519123096401-45dsv48mpd1a1ek5m4u9643b9mup96ja.apps.googleusercontent.com
// GOOGLE_CLIENT_SECRET= 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

module.exports = {
  login,
  signup,
  logout,
  forgotPassword,
  resetPassword,
  checkAuth,
  updateProfile,
  googleAuthRedirect,
  googleAuthCallback,
};
