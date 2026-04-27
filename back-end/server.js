const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Create MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err);
    return;
  }
  console.log("Connected to MySQL");
});

// GET all tickets
app.get("/api/tickets", (req, res) => {
  db.query("SELECT * FROM tickets", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// CREATE ticket
app.post("/api/tickets", (req, res) => {
  const { title } = req.body;

  db.query(
    "INSERT INTO tickets (title) VALUES (?)",
    [title],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        id: result.insertId,
        title
      });
    }
  );
});

// DELETE ticket
app.delete("/api/tickets/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM tickets WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "Deleted" });
  });
});

// UPDATE ticket
app.put("/api/tickets/:id", (req, res) => {
  const id = req.params.id;
  const { title } = req.body;

  db.query(
    "UPDATE tickets SET title = ? WHERE id = ?",
    [title, id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Ticket not found" });
      }

      res.json({ id, title });
    }
  );
});

// RESET (for tests)
async function resetTickets() {
  await db.promise().query("DELETE FROM tickets");
  await db.promise().query("ALTER TABLE tickets AUTO_INCREMENT = 1");
}

async function closeDb() {
  await db.promise().end();
}

if (require.main === module) {
  app.listen(5002, () => console.log("Server running on port 5002"));
}

module.exports = { app, resetTickets, closeDb };



