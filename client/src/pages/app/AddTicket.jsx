import React from 'react';
import { useState } from 'react';
import API from '../../api';

const AddTicket = () => {
  
  const [tickets, setTickets] = useState([]);
  const [event, setEvent] = useState("");
  const [price, setPrice] = useState(0);
  const [available, setAvailable] = useState(true); 
 const user = JSON.parse(localStorage.getItem("user") || "null");

  const addTicket = async () => {
    try {
      await API.post("/tickets/create", { event, price, available });
      setEvent("");
      setPrice(0);
      setAvailable(true); // reset
       alert("Ticket added Successfully");
    } catch (err) {
      alert("Failed to add ticket");
    }
  };



  return (
    <div>
    
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

    </div>
  );
}

export default AddTicket;
