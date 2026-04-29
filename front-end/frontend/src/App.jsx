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
    fetch(`${apiBaseUrl}/api/tickets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title: newTicket })
    })
      .then(res => res.json())
      .then(data => {
        setTickets([...tickets, data]);
        setNewTicket("");
      });
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

        <section className="composer" aria-label="Add a ticket">
          <label className="visually-hidden" htmlFor="ticket-input">
            New ticket
          </label>
          <input
            id="ticket-input"
            value={newTicket}
            onChange={(e) => setNewTicket(e.target.value)}
            placeholder="Enter ticket"
          />

          <button onClick={addTicket}>Add Ticket</button>
        </section>

        <section className="ticket-list" aria-label="Current tickets">
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
              </article>
            ))
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
