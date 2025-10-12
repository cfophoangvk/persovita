const jwt = require("jsonwebtoken");
const {
  JWT_EXPIRES_IN,
  COOKIE_NAME,
  COOKIE_EXPIRES_IN,
} = require("../constants/constant.js");

const generateTokenAndSetCookie = (res, userId, email, role) => {
  const token = jwt.sign({ id: userId, email, role }, process.env.JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
  // Set cookie options depending on environment. For local dev (http + different ports)
  // SameSite 'lax' is a reasonable default; in production where backend/frontend might be on different domains,
  // use 'none' and secure: true (requires HTTPS).
  const isProd = process.env.NODE_ENV === "production";
  const cookieOptions = {
    httpOnly: true,
    sameSite: isProd ? "none" : "lax",
    secure: isProd, // secure cookies only in production (HTTPS)
    maxAge: COOKIE_EXPIRES_IN,
    path: "/",
  };

  res.cookie(COOKIE_NAME, token, cookieOptions);
  return token;
};

module.exports = generateTokenAndSetCookie;
