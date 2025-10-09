const FRONTEND_URL = "http://localhost:5173";
const JWT_SECRET = "mysecretkey";
const JWT_EXPIRES_IN = "7d"; // 1 hour
const COOKIE_NAME = "token";
const COOKIE_EXPIRES_IN = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
const REMEMBER_COOKIE_EXPIRES = 30 * 24 * 60 * 60 * 1000; // 30 days

module.exports = {
  FRONTEND_URL,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  COOKIE_NAME,
  COOKIE_EXPIRES_IN,
  REMEMBER_COOKIE_EXPIRES,
};
