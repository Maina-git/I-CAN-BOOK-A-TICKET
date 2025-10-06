import express from "express";
import { createTicket, bookTicket, getAllTickets, getUserBookings } from "../controllers/ticketController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", createTicket);                // create ticket
router.get("/", getAllTickets);                // all tickets
router.post("/book", authMiddleware, bookTicket); // book ticket
router.get("/my", authMiddleware, getUserBookings); // my bookings

export default router;





