import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api", (req, res)=>{ res.status(201).json({message:"Welcome to a ticket booking app"})});
app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => console.log("Server running on http://localhost:5000"));
  })
  .catch(err => console.log(err));