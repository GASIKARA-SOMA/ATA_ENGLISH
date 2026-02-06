const express = require("express");
const router = express.Router();

// Route test admin
router.get("/", (req, res) => {
  res.json({
    message: "Admin route works ✅",
  });
});

// Exemple route admin dashboard
router.get("/dashboard", (req, res) => {
  res.json({
    message: "Welcome to Admin Dashboard 🚀",
  });
});

module.exports = router;
