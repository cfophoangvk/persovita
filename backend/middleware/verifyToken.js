const jwt = require("jsonwebtoken");
const { JWT_SECRET, COOKIE_NAME } = require("../constants/constant.js");

const verifyToken = async (req, res, next) => {
  const token = req.cookies && req.cookies[COOKIE_NAME];
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized - Không có token" });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded)
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - Token không hợp lệ" });

    req.id = decoded.id;
    next();
  } catch (error) {
    console.log("Lỗi ở hàm verifyToken ", error.message || error);
    return res
      .status(401)
      .json({
        success: false,
        message: "Unauthorized - Token invalid or expired",
      });
  }
};

module.exports = verifyToken;
