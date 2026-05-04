import express from "express";
import Event from "../models/Event.js";

const router = express.Router();

// CREATE event (already used internally when admin approves)
router.post("/", async (req, res) => {
  try {
    const { title, description, date, venue, capacity } = req.body;
    const event = new Event({ title, description, date, venue, capacity, status: "approved" });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET all events
router.get("/", async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

// GET only approved events (for students)
router.get("/approved", async (req, res) => {
  const events = await Event.find({ status: "approved" });
  res.json(events);
});

// DELETE one event
router.delete("/:id", async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event Deleted" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
