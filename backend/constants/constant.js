const JWT_EXPIRES_IN = "7d"; // 1 hour
const COOKIE_NAME = "token";
const COOKIE_EXPIRES_IN = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

module.exports = {
  JWT_EXPIRES_IN,
  COOKIE_NAME,
  COOKIE_EXPIRES_IN,
};
