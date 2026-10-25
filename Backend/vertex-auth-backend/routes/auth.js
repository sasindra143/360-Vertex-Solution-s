const express = require("express");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

const router = express.Router();

/* ===========================
   FORGOT PASSWORD
=========================== */
router.post("/forgot-password", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).json({
      message: "No account found with this email",
    });
  }

  // 🔑 Generate secure token
  const token = crypto.randomBytes(32).toString("hex");

  user.resetToken = token;
  user.resetTokenExpire = Date.now() + 15 * 60 * 1000; // 15 min
  await user.save();

  const resetLink = `http://localhost:3000/reset-password/${token}`;

  await sendEmail(
    user.email,
    "Reset your password",
    `Click this link to reset password:\n${resetLink}`
  );

  res.json({
    message: "Reset link sent to your email",
  });
});
