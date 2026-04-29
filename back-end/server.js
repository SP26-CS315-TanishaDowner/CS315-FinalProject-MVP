const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const initialTickets = [
  { id: 1, title: "Printer not working" },
  { id: 2, title: "Password reset" }
];

let tickets = [...initialTickets];
let nextTicketId = 3;

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/tickets", (req, res) => {
  res.json(tickets);
});

app.post("/api/tickets", (req, res) => {
  const newTicket = {
    id: nextTicketId++,
    title: req.body.title
  };
  tickets.push(newTicket);
  res.json(newTicket);
});

app.put("/api/tickets/:id", (req, res) => {
  const ticketId = Number(req.params.id);
  const ticketIndex = tickets.findIndex(ticket => ticket.id === ticketId);

  if (ticketIndex === -1) {
    return res.status(404).json({ message: "Ticket not found" });
  }

  tickets[ticketIndex] = {
    ...tickets[ticketIndex],
    title: req.body.title
  };

  res.json(tickets[ticketIndex]);
});

app.delete("/api/tickets/:id", (req, res) => {
  const ticketId = Number(req.params.id);
  const ticketIndex = tickets.findIndex(ticket => ticket.id === ticketId);

  if (ticketIndex === -1) {
    return res.status(404).json({ message: "Ticket not found" });
  }

  tickets.splice(ticketIndex, 1);
  res.status(200).send();
});

// Helper functions for testing
const resetTickets = async () => {
  tickets = [];
  nextTicketId = 1;
};

const closeDb = async () => {
  // Placeholder for database cleanup if needed
};

// Start server only if this file is run directly
if (require.main === module) {
  app.listen(5002, () => console.log("Server running on port 5002"));
}

// Export for testing
module.exports = { app, resetTickets, closeDb };