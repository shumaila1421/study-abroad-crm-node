const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/auth.controller");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);

router.get("/me", protect, (req, res) => {
  res.json({
    message: "You are logged in!",
    user: req.user,
  });
});

router.get("/admin", protect, adminOnly, (req, res) => {
  res.json({
    message: "Welcome Admin!",
    user: req.user,
  });
});

module.exports = router;
