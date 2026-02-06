const express = require("express");
const User = require("../models/User.js");
const { protect } = require("../middleware/auth.middleware.js");

const router = express.Router();

// GET ALL USERS
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET USER PROFILE BY ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE PROFILE (protected)
router.put("/:id", protect, async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        username: req.body.username,
        bio: req.body.bio,
        profilePic: req.body.profilePic,
      },
      { new: true }
    ).select("-password");

    res.json({ message: "Profile updated ✅", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
