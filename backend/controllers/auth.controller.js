const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const generateTokenAndSetCookie = require("../utils/generateTokenAndSetCookie");
const dbPath = path.resolve(process.cwd(), "db/database.json");
const { sendMail } = require("../utils/mailer");

const dotenv = require("dotenv");
const { addToCart } = require("./cart.controller");
dotenv.config();

const FRONTEND_URL = process.env.FRONTEND_URL;

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

    // block login if email not verified
    // if (!user.isVerified) {
    //   return res.status(403).json({
    //     success: false,
    //     message:
    //       "Email chưa được xác thực. Vui lòng kiểm tra email để xác thực hoặc gửi lại email xác thực.",
    //   });
    // }

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

    // generate email verification token
    const verifyToken = crypto.randomBytes(32).toString("hex");
    const verifyExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

    const newUser = {
      id: newId,
      fullName: fullName || "",
      email,
      password: hashed,
      role: role || "user",
      picture: picture || "",
      phone: phone || "",
      address: address || "",
      createdAt: new Date().toISOString(),
      // email verification fields
      // isVerified: false,
      // emailVerifyToken: verifyToken,
      // emailVerifyExpires: verifyExpires,
    };

    db.users.push(newUser);
    await fs.promises.writeFile(dbPath, JSON.stringify(db, null, 2), "utf-8");

    // send verification email (best-effort)
    // const verifyUrl = `${FRONTEND_URL}/verify-email/${verifyToken}`;
    // const subject = "Xác thực email - PERSOVITA";
    // const html = `
    //   <div style="font-family: Arial, Helvetica, sans-serif; color: #333;">
    //     <h2 style="color:#f28d3d">PERSOVITA — Xác thực email</h2>
    //     <p>Xin chào ${newUser.fullName || ""},</p>
    //     <p>Vui lòng xác thực email bằng cách nhấn nút bên dưới. Liên kết có hiệu lực trong 24 giờ.</p>
    //     <p style="text-align:center; margin: 24px 0;">
    //       <a href="${verifyUrl}" style="background:#f28d3d; color:white; padding:12px 20px; text-decoration:none; border-radius:6px;">Xác thực email</a>
    //     </p>
    //     <p>Nếu nút không hoạt động, sao chép đường dẫn sau vào trình duyệt:</p>
    //     <pre style="background:#f7f7f7; padding:10px; border-radius:6px;">${verifyUrl}</pre>
    //     <p>Trân trọng,<br/>Đội ngũ PERSOVITA</p>
    //   </div>
    // `;
    // try {
    //   await sendMail({ to: email, subject, html });
    // } catch (mailErr) {
    //   console.error(
    //     "Failed to send verification email:",
    //     mailErr?.message || mailErr
    //   );
    //   // do not fail signup if email sending fails
    // }

    // generateTokenAndSetCookie(res, newUser.id, newUser.email, newUser.role);

    const { password: _storedPassword, ...userSafe } = newUser;
    return res.status(201).json({
      success: true,
      message:
        "Tạo tài khoản thành công." /**. Vui lòng kiểm tra email để xác thực tài khoản.**/,
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
      // still return generic success so we don't reveal account existence
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
    `${req.protocol}s://${req.get("host")}/api/auth/google/callback`
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
        redirect_uri: `${req.protocol}s://${req.get(
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
        fullName: profile.name || "",
        email: profile.email,
        role: "user",
        picture: profile.picture || "",
        phone: "",
        address: "",
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

    const key = "persistCart";
    const raw1 = localStorage.getItem(key) || "[]";
    const list = JSON.parse(raw1 || "[]");
    if (!list || list.length === 0) {
      for (const item of list) {
        try {
          // map fields to payload expected by server
          const payload = {
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity || 1,
            image: item.image || "",
            subscription: item.subscription || false,
            subscriptionMonths: item.subscriptionMonths || 0,
          };

          addToCart(
            { body: payload, id: user.id },
            { status: () => ({ json: () => {} }) }
          );
          localStorage.removeItem(key);
          window.dispatchEvent(new CustomEvent("cart:updated"));
        } catch (e) {
          // ignore individual failures
        }
      }
    }
    // redirect to frontend
    res.redirect(FRONTEND_URL || "/");
  } catch (err) {
    console.error("Google OAuth error:", err);
    res.status(500).send("Google auth failed");
  }
};

const verifyEmail = async (req, res) => {
  try {
    const raw = await fs.promises.readFile(dbPath, "utf-8");
    const db = JSON.parse(raw);

    //Treat as verification callback: token param or query
    const token = req.params.token || req.query.token;
    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "Token là bắt buộc" });
    }

    const userIndex = db.users.findIndex((u) => u.emailVerifyToken === token);
    if (userIndex === -1) {
      return res
        .status(400)
        .json({ success: false, message: "Token không hợp lệ" });
    }

    if (
      !db.users[userIndex].emailVerifyExpires ||
      db.users[userIndex].emailVerifyExpires < Date.now()
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Token đã hết hạn" });
    }

    db.users[userIndex].isVerified = true;
    delete db.users[userIndex].emailVerifyToken;
    delete db.users[userIndex].emailVerifyExpires;

    await fs.promises.writeFile(dbPath, JSON.stringify(db, null, 2), "utf-8");

    // redirect to frontend success page
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
