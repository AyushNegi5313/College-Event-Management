import mongoose from "mongoose";

const greenSheetSchema = new mongoose.Schema(
  {
    organiser: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    eventName: { type: String, required: true },
    eventType: { type: String, required: true },
    fromDate: { type: Date, required: true },
    toDate: { type: Date, required: true },
    venue: { type: String, required: true },
    totalParticipants: { type: Number, required: true },
    description: { type: String, required: true },
    requirements: { type: String, required: true },
    registrationLink: { type: String, required: true },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" }
  },
  { timestamps: true }
);

export default mongoose.model("GreenSheet", greenSheetSchema);
