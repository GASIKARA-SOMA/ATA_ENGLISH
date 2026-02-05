
import express from "express";
import Post from "../models/Post.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// CREATE POST
router.post("/", protect, async (req, res) => {
  try {
    const post = await Post.create({
      userId: req.user.id,
      content: req.body.content,
      image: req.body.image || ""
    });

    res.status(201).json({ message: "Post created ✅", post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET ALL POSTS
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("userId", "username profilePic");

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// LIKE / UNLIKE POST
router.put("/:id/like", protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.likes.includes(req.user.id)) {
      post.likes = post.likes.filter((id) => id.toString() !== req.user.id);
      await post.save();
      return res.json({ message: "Post unliked 👎", post });
    }

    post.likes.push(req.user.id);
    await post.save();

    res.json({ message: "Post liked 👍", post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE POST
router.delete("/:id", protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted 🗑️" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
