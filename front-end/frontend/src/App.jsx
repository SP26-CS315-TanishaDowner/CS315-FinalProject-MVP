import { useEffect, useState } from "react";

function App() {
  const [tickets, setTickets] = useState([]);
  const [newTicket, setNewTicket] = useState("");
  const [editingTicketId, setEditingTicketId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const apiBaseUrl = "http://localhost:5002";

  // GET tickets
  useEffect(() => {
    fetch(`${apiBaseUrl}/api/tickets`)
      .then(res => res.json())
      .then(data => setTickets(data));
  }, []);

  // POST ticket
  const addTicket = () => {
    if (!newTicket.trim()) {
      return;
    }

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

  const startEditingTicket = (ticket) => {
    setEditingTicketId(ticket.id);
    setEditingTitle(ticket.title);
  };

  const cancelEditingTicket = () => {
    setEditingTicketId(null);
    setEditingTitle("");
  };

  const saveTicket = (ticketId) => {
    const trimmedTitle = editingTitle.trim();

    if (!trimmedTitle) {
      return;
    }

    fetch(`${apiBaseUrl}/api/tickets/${ticketId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title: trimmedTitle })
    })
      .then(res => res.json())
      .then(updatedTicket => {
        setTickets(
          tickets.map(ticket => (ticket.id === updatedTicket.id ? updatedTicket : ticket))
        );
        cancelEditingTicket();
      });
  };

  const deleteTicket = (ticketId) => {
    fetch(`${apiBaseUrl}/api/tickets/${ticketId}`, {
      method: "DELETE"
    }).then(() => {
      setTickets(tickets.filter(ticket => ticket.id !== ticketId));

      if (editingTicketId === ticketId) {
        cancelEditingTicket();
      }
    });
  };

  return (
    <div className="app-shell">
      <main className="ticket-card">
        <header className="ticket-header">
          <p className="eyebrow">Project board</p>
          <h1>Ticket List</h1>
          <p className="subtitle">
            Keep track of tasks, ideas, and follow-ups in one simple board.
          </p>
        </header>

        <div className="ticket-form" role="search">
          <input
            className="ticket-input"
            value={newTicket}
            onChange={(e) => setNewTicket(e.target.value)}
            placeholder="Enter ticket"
            aria-label="New ticket title"
          />

          <button className="ticket-button" onClick={addTicket}>
            Add Ticket
          </button>
        </div>

        <section className="ticket-list" aria-label="Tickets">
          {tickets.length === 0 ? (
            <div className="empty-state">
              <p>No tickets yet. Add one to get started, then edit or delete it from the list.</p>
            </div>
          ) : (
            tickets.map(ticket => (
              <article className="ticket-item" key={ticket.id}>
                <span className="ticket-dot" aria-hidden="true" />
                <div className="ticket-body">
                  <div className="ticket-meta">
                    <p className="ticket-label">Ticket #{ticket.id}</p>
                    <span className="ticket-badge">Open</span>
                  </div>

                  {editingTicketId === ticket.id ? (
                    <div className="ticket-edit">
                      <input
                        className="ticket-edit-input"
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        aria-label={`Edit ticket ${ticket.id}`}
                      />

                      <div className="ticket-actions">
                        <button className="ticket-action ticket-action-primary" onClick={() => saveTicket(ticket.id)}>
                          Save
                        </button>
                        <button className="ticket-action" onClick={cancelEditingTicket}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="ticket-view">
                      <p className="ticket-title">{ticket.title}</p>

                      <div className="ticket-actions">
                        <button className="ticket-action" onClick={() => startEditingTicket(ticket)}>
                          Edit
                        </button>
                        <button className="ticket-action ticket-action-danger" onClick={() => deleteTicket(ticket.id)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
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
