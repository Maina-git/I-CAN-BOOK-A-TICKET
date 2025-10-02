import { useEffect, useState } from "react";
import API from "../api";

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [event, setEvent] = useState("");
  const [price, setPrice] = useState(0);
  const [available, setAvailable] = useState(true); 

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const fetchTickets = async () => {
    const res = await API.get("/tickets");
    setTickets(res.data);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const book = async (ticketId) => {
    try {
      await API.post("/tickets/book", { ticketId, userId: user._id });
      alert("Ticket booked!");
      fetchTickets();
    } catch (err) {
      alert(err.response?.data?.error || "Booking failed");
    }
  };

  const addTicket = async () => {
    try {
      await API.post("/tickets/create", { event, price, available });
      setEvent("");
      setPrice(0);
      setAvailable(true); // reset
      fetchTickets();
    } catch (err) {
      alert("Failed to add ticket");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Available Tickets</h2>
      <div className="border p-4 mb-6">
        <h3 className="font-bold mb-2">Add New Ticket</h3>
        <input
          className="border p-2 m-2"
          placeholder="Event Name"
          value={event}
          onChange={(e) => setEvent(e.target.value)}/>
        <input
          className="border p-2 m-2"
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}/>
        <label className="m-2 flex items-center">
          <input
            type="checkbox"
            checked={available}
            onChange={(e) => setAvailable(e.target.checked)}
            className="mr-2"/>
          Available
        </label>
        <button
          onClick={addTicket}
          className="bg-green-500 text-white px-4 py-2">
          Add Ticket
        </button>
      </div>
      {tickets.map((t) => (
        <div
          key={t._id}
          className="border p-4 mb-2 flex justify-between items-center">
          <div>
            <p className="font-bold">{t.event}</p>
            <p>Price: ${t.price}</p>
            <p>
              Status:{" "}
              <span
                className={`${
                  t.available ? "text-green-600" : "text-red-600"
                } font-semibold`}>
                {t.available ? "Available" : "Sold Out"}
              </span>
            </p>
          </div>
          <button
            onClick={() => book(t._id)}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            disabled={!t.available}>
            {t.available ? "Book" : "Sold Out"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Tickets;
