const router = require("express").Router();
const {
  signup,
  login,
  logout,
  checkAuth,
  forgotPassword,
  resetPassword,
  updateProfile,
  googleAuthRedirect,
  googleAuthCallback,
  verifyEmail,
} = require("../controllers/auth.controller.js");

const verifyToken = require("../middleware/verifyToken.js");

router.get("/check-auth", verifyToken, checkAuth);

// Google OAuth
router.get("/google", googleAuthRedirect);
router.get("/google/callback", googleAuthCallback);

router.post("/update-profile", verifyToken, updateProfile);

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);
router.post("/verify-email/:token", verifyEmail);

module.exports = router;
