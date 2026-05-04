import express from "express";
import Registration from "../models/Registration.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all registrations (admin route in real app)
router.get("/", protect, async (req, res) => {
  try {
    const regs = await Registration.find()
      .populate("user", "name email")
      .populate("event", "title date venue");
    res.json(regs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
