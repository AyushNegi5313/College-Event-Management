import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import GreenSheet from "../models/GreenSheet.js";
import Event from "../models/Event.js";

const router = express.Router();

/* CREATE REQUEST */
router.post("/", protect, async (req, res) => {
  try {
    const {
      eventName,
      eventType,
      fromDate,
      toDate,
      venue,
      totalParticipants,
      description,
      requirements,
      registrationLink
    } = req.body;

    const gs = await GreenSheet.create({
      organiser: req.user._id,
      eventName,
      eventType,
      fromDate,
      toDate,
      venue,
      totalParticipants,
      description,
      requirements,
      registrationLink
    });

    res.status(201).json(gs);
  } catch (err) {
    console.log("GREEN SHEET ERROR =>", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* GET ALL REQUESTS */
router.get("/", protect, async (req, res) => {
  const all = await GreenSheet.find().populate("organiser", "_id name email");
  res.json(all);
});

/* APPROVE REQUEST */
router.patch("/:id/approve", protect, async (req, res) => {
  try {
    const gs = await GreenSheet.findById(req.params.id);
    if (!gs) return res.status(404).json({ message: "Not found" });

    gs.status = "approved";
    await gs.save();

    const evt = await Event.create({
      title: gs.eventName,
      type: gs.eventType,
      fromDate: gs.fromDate,
      toDate: gs.toDate,
      venue: gs.venue,
      description: gs.description,
      totalParticipants: gs.totalParticipants,
      requirements: gs.requirements,
      registrationLink: gs.registrationLink,
      organiser: gs.organiser,
      status: "approved"
    });

    res.json({ message: "Approved and event created", event: evt });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* REJECT REQUEST */
router.patch("/:id/reject", protect, async (req, res) => {
  try {
    const gs = await GreenSheet.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );

    if (!gs) return res.status(404).json({ message: "Not found" });

    res.json({ message: "Rejected", request: gs });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
