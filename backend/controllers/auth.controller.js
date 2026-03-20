const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const generateTokenAndSetCookie = require("../utils/generateTokenAndSetCookie");
const User = require("../models/User");
const { sendMail } = require("../utils/mailer");

const dotenv = require("dotenv");
dotenv.config();

const FRONTEND_URL = process.env.FRONTEND_URL;

// Helper: generate next auto-increment id
const getNextUserId = async () => {
  const last = await User.findOne().sort({ id: -1 }).lean();
  return last ? last.id + 1 : 1;
};

const login = async (req, res) => {
  const { email, password, remember = false } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email và mật khẩu là bắt buộc" });
  }

  try {
    const user = await User.findOne({ email }).lean();
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Thông tin đăng nhập không hợp lệ" });

    // If user has no password (Google OAuth), block password login
    if (!user.password) {
      return res
        .status(401)
        .json({ success: false, message: "Thông tin đăng nhập không hợp lệ" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res
        .status(401)
        .json({ success: false, message: "Thông tin đăng nhập không hợp lệ" });

    generateTokenAndSetCookie(res, user.id, user.email, user.role, remember);

    const { password: _storedPassword, __v, _id, ...userSafe } = user;
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
  const { email, password, role, fullName, phone, address, picture } = req.body;

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
    const existing = await User.findOne({ email });
    if (existing) {
      return res
        .status(409)
        .json({ success: false, message: "Email đã được sử dụng" });
    }

    const hashed = await bcrypt.hash(password, 12);
    const newId = await getNextUserId();

    const newUser = await User.create({
      id: newId,
      fullName: fullName || "",
      email,
      password: hashed,
      role: role || "user",
      picture: picture || "",
      phone: phone || "",
      address: address || "",
    });

    generateTokenAndSetCookie(res, newUser.id, newUser.email, newUser.role);

    const userObj = newUser.toObject();
    const { password: _storedPassword, __v, _id, ...userSafe } = userObj;
    return res.status(201).json({
      success: true,
      message: "Tạo tài khoản thành công.",
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
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message:
          "Email này hiện không tồn tại trong hệ thống, vui lòng kiểm tra lại",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expires = Date.now() + 60 * 60 * 1000; // 1 hour

    user.resetToken = token;
    user.resetTokenExpires = expires;
    await user.save();

    const resetUrl = `${FRONTEND_URL}/reset-password/${token}`;

    const subject = "Hướng dẫn đặt lại mật khẩu - PERSOVITA";
    const html = `
      <div style="font-family: Arial, Helvetica, sans-serif; color: #333;">
        <h2 style="color:#f28d3d">PERSOVITA — Đặt lại mật khẩu</h2>
        <p>Xin chào,</p>
        <p>Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản liên kết với <strong>${email}</strong>.</p>
        <p>Để đặt lại mật khẩu, vui lòng nhấn nút bên dưới. Liên kết này có hiệu lực trong 1 giờ.</p>
        <p style="text-align:center; margin: 24px 0;">
          <a href="${resetUrl}" style="background:#f28d3d; color:white; padding:12px 20px; text-decoration:none; border-radius:6px;">Đặt lại mật khẩu</a>
        </p>
        <p>Nếu nút không hoạt động, sao chép và dán đường dẫn sau vào trình duyệt của bạn:</p>
        <pre style="background:#f7f7f7; padding:10px; border-radius:6px;">${resetUrl}</pre>
        <p>Nếu bạn không yêu cầu thay đổi này, xin hãy bỏ qua email này. Tài khoản của bạn sẽ an toàn.</p>
        <p>Trân trọng,<br/>Đội ngũ PERSOVITA</p>
      </div>
    `;

    try {
      await sendMail({ to: email, subject, html });
    } catch (mailErr) {
      console.error("Failed to send reset email:", mailErr.message || mailErr);
      return res.status(200).json({
        success: true,
        message:
          "Yêu cầu đã được ghi nhận. Nếu email tồn tại, bạn sẽ nhận được hướng dẫn để đặt lại mật khẩu.",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Nếu email tồn tại, bạn sẽ nhận được hướng dẫn để đặt lại mật khẩu. Vui lòng kiểm tra hộp thư đến hoặc thư mục spam.",
    });
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
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Token không hợp lệ hoặc đã hết hạn",
      });
    }

    const hashed = await bcrypt.hash(newPassword, 12);
    user.password = hashed;
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save();

    generateTokenAndSetCookie(res, user.id, user.email, user.role);

    const userObj = user.toObject();
    const { password: _p, __v, _id, ...userSafe } = userObj;
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
    const user = await User.findOne({ id: req.id }).lean();
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const { password, __v, _id, ...userSafe } = user;
    res.status(200).json({ success: true, user: userSafe });
  } catch (error) {
    console.log("Lỗi ở checkAuth controller", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { fullName, phone, address } = req.body;
    const user = await User.findOne({ id: req.id });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (typeof fullName === "string") user.fullName = fullName;
    if (typeof phone === "string") user.phone = phone;
    if (typeof address === "string") user.address = address;

    await user.save();

    const userObj = user.toObject();
    const { password, __v, _id, ...userSafe } = userObj;
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
    `${req.protocol}s://${req.get("host")}/api/auth/google/callback`,
  );
  const scope = encodeURIComponent("openid email profile");
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(
    clientId,
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
        redirect_uri: `${req.protocol}s://${req.get(
          "host",
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
      },
    );
    const profile = await profileRes.json();

    let user = await User.findOne({ email: profile.email });
    if (!user) {
      const newId = await getNextUserId();
      user = await User.create({
        id: newId,
        fullName: profile.name || "",
        email: profile.email,
        role: "user",
        picture: profile.picture || "",
        phone: "",
        address: "",
      });
    }

    const rememberFlag = String(req.query.remember || "false") === "true";
    generateTokenAndSetCookie(
      res,
      user.id,
      user.email,
      user.role,
      rememberFlag,
    );

    const redirectTo =
      (FRONTEND_URL || "/") +
      (FRONTEND_URL?.includes("?") ? "&" : "?") +
      "syncCart=1";
    res.redirect(redirectTo);
  } catch (err) {
    console.error("Google OAuth error:", err);
    res.status(500).send("Google auth failed");
  }
};

const verifyEmail = async (req, res) => {
  try {
    const token = req.params.token || req.query.token;
    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "Token là bắt buộc" });
    }

    const user = await User.findOne({ emailVerifyToken: token });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Token không hợp lệ" });
    }

    if (!user.emailVerifyExpires || user.emailVerifyExpires < Date.now()) {
      return res
        .status(400)
        .json({ success: false, message: "Token đã hết hạn" });
    }

    user.isVerified = true;
    user.emailVerifyToken = undefined;
    user.emailVerifyExpires = undefined;
    await user.save();

    const redirectTo = `${FRONTEND_URL || "/"}?verify=success`;
    return res.redirect(redirectTo);
  } catch (err) {
    console.error("Lỗi ở verifyEmail:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

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
  verifyEmail,
};
