import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem('token'); // assuming JWT is stored here
        const res = await axios.get('/api/tickets/my', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTickets(res.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch tickets');
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading your tickets...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (tickets.length === 0) return <p className="text-center mt-10">No tickets found.</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">My Booked Tickets</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {tickets.map((ticket) => (
          <div
            key={ticket._id}
            className="border rounded-2xl p-4 shadow-sm hover:shadow-md transition">
            <h3 className="text-lg font-semibold">{ticket.eventName}</h3>
            <p className="text-gray-600">Date: {new Date(ticket.date).toLocaleDateString()}</p>
            <p className="text-gray-600">Seat: {ticket.seatNumber || 'N/A'}</p>
            <p className="text-gray-600">Price: ${ticket.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTickets;
