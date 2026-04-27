import React from "react";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tickets, setTickets] = useState([]);
  const [newTicket, setNewTicket] = useState("");
  const apiBaseUrl = "http://localhost:5002";

  // GET tickets
  useEffect(() => {
    fetch(`${apiBaseUrl}/api/tickets`)
      .then(res => res.json())
      .then(data => setTickets(data));
  }, []);

  // POST ticket
  const addTicket = () => {
    const title = newTicket.trim();
    if (!title) return;

    fetch(`${apiBaseUrl}/api/tickets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title })
    })
      .then(res => res.json())
      .then(data => {
        setTickets([...tickets, data]);
        setNewTicket("");
      });
  };

  // DELETE ticket
  const deleteTicket = (id) => {
    fetch(`${apiBaseUrl}/api/tickets/${id}`, {
      method: "DELETE"
    }).then(() => {
      setTickets(tickets.filter(t => t.id !== id));
    });
  };

  // UPDATE ticket
  const updateTicket = (id) => {
    const newTitle = prompt("Enter new ticket name:");
    if (!newTitle) return;

    fetch(`${apiBaseUrl}/api/tickets/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title: newTitle })
    })
      .then(res => res.json())
      .then(updated => {
        setTickets(tickets.map(t => t.id === id ? updated : t));
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addTicket();
  };

  return (
    <div className="app-shell">
      <main className="ticket-card">
        <header className="ticket-header">
          <p className="eyebrow">Support Queue</p>
          <h1>Ticket List</h1>
          <p className="subtitle">
            Track requests, add new issues, and keep the queue moving.
          </p>
        </header>

        <form className="composer" onSubmit={handleSubmit}>
          <input
            value={newTicket}
            onChange={(e) => setNewTicket(e.target.value)}
            placeholder="Enter ticket"
          />
          <button type="submit">Add Ticket</button>
        </form>

        <section className="ticket-list">
          {tickets.length === 0 ? (
            <div className="empty-state">
              <span className="empty-badge">No tickets yet</span>
              <p>Create the first ticket to start the queue.</p>
            </div>
          ) : (
            tickets.map((ticket) => (
              <article className="ticket-item" key={ticket.id}>
                <span className="ticket-id">#{ticket.id}</span>
                <p>{ticket.title}</p>

                {/* 🔥 NEW BUTTONS */}
                <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                  <button onClick={() => updateTicket(ticket.id)}>
                    Edit
                  </button>
                  <button onClick={() => deleteTicket(ticket.id)}>
                    Delete
                  </button>
                </div>
              </article>
            ))
          )}
        </section>
      </main>
    </div>
  );
}

export default App;