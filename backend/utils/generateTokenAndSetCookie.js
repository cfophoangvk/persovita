const jwt = require("jsonwebtoken");
const {
  JWT_SECRET,
  JWT_EXPIRES_IN,
  COOKIE_NAME,
  COOKIE_EXPIRES_IN,
} = require("../constants/constant.js");

const generateTokenAndSetCookie = (res, userId, email, role) => {
  const token = jwt.sign({ id: userId, email, role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: COOKIE_EXPIRES_IN,
  });
  return token;
};

module.exports = generateTokenAndSetCookie;
