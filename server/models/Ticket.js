import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  event: { type: String, required: true },
  price: { type: Number, required: true },
  available: { type: Boolean, default: true },
  bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }
}, { timestamps: true });

export default mongoose.model("Ticket", ticketSchema);
