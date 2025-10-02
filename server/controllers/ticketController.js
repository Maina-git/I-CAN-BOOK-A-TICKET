import Ticket from "../models/Ticket.js";

// Create a new ticket
export const createTicket = async (req, res) => {
  try {
    const { event, price, available } = req.body;
    const ticket = new Ticket({ event, price, available });
    await ticket.save();
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Book a ticket
export const bookTicket = async (req, res) => {
  try {
    const { ticketId } = req.body;
    const userId = req.user.id; // requires auth middleware to set req.user

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) return res.status(404).json({ error: "Ticket not found" });
    if (!ticket.available) return res.status(400).json({ error: "Ticket already booked" });

    ticket.available = false;
    ticket.bookedBy = userId;
    await ticket.save();

    res.json({ message: "Ticket booked successfully", ticket });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all tickets
export const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get tickets booked by a user
export const getUserBookings = async (req, res) => {
  try {
    const userId = req.user.id; // use token auth
    const tickets = await Ticket.find({ bookedBy: userId });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
