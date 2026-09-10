const express = require("express");
const User = require("../models/User.js");
const protect = require("../middleware/auth.js");

const router = express.Router();

// GET ALL USERS
// GET /api/users
router.get("/", protect, async (req, res) => {
  try {
    const users = await User.find()
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      total: users.length,
      users,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch users",
    });
  }
});

// GET SINGLE USER
// GET /api/users/:id
router.get("/:id", protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).lean();

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.json(user);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch user",
    });
  }
});

// DELETE USER
// DELETE /api/users/:id
router.delete("/:id", protect, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        error: "Invalid user ID",
      });
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Delete user error:", error);

    res.status(500).json({
      error: "Failed to delete user",
    });
  }
});

module.exports = router;