const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let tickets = [
  { id: 1, title: "Printer not working" },
  { id: 2, title: "Password reset" }
];

app.get("/api/tickets", (req, res) => {
  res.json(tickets);
});

app.post("/api/tickets", (req, res) => {
  const newTicket = {
    id: tickets.length + 1,
    title: req.body.title
  };
  tickets.push(newTicket);
  res.json(newTicket);
});

app.listen(5000, () => console.log("Server running on port 5000"));