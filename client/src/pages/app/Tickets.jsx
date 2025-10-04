import React from 'react';
import { useState, useEffect } from 'react';
import API from '../../api';


const Tickets = () => {
  const [tickets, setTickets] = useState([]);


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

  return (
    <div>
    <div className="w-[90%] md:w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
     {tickets.map((t) => (
        <div
          key={t._id}
          className="shadow-lg h-[200px] p-4 mb-2 flex justify-between items-center rounded-lg">
          <div>
            <p className="font-bold text-blue-400 text-2xl">{t.event}</p>
            <p>Price: ${t.price}</p>
            <p className="font-bold text-xl text-gray-500">
              Status:{" "}
              <span
                className={`${
                  t.available ? "text-green-400" : "text-red-400"
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
    </div>
  );
}

export default Tickets;
