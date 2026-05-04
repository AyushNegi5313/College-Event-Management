import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, required: true },

    fromDate: { type: Date, required: true },
    toDate: { type: Date, required: true },

    venue: { type: String, required: true },
    description: { type: String, required: true },
    totalParticipants: { type: Number, required: true },
    requirements: { type: String },

    registrationLink: { type: String },

    organiser: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    status: { type: String, enum: ["approved", "rejected"], default: "approved" }
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);
