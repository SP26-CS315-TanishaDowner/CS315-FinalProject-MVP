import { useEffect, useState } from "react";

function App() {
  const [tickets, setTickets] = useState([]);
  const [newTicket, setNewTicket] = useState("");

  // GET tickets
  useEffect(() => {
    fetch("http://localhost:5000/api/tickets")
      .then(res => res.json())
      .then(data => setTickets(data));
  }, []);

  // POST ticket
  const addTicket = () => {
    fetch("http://localhost:5000/api/tickets", {
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
    <div>
      <h1>Ticket List</h1>

      <input
        value={newTicket}
        onChange={(e) => setNewTicket(e.target.value)}
        placeholder="Enter ticket"
      />

      <button onClick={addTicket}>Add Ticket</button>

      {tickets.map(ticket => (
        <p key={ticket.id}>{ticket.title}</p>
      ))}
    </div>
  );
}

export default App;
