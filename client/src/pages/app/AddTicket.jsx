import React from 'react';
import { useState } from 'react';
import API from '../../api';

const AddTicket = () => {
  const [event, setEvent] = useState("");
  const [price, setPrice] = useState(0);
  const [available, setAvailable] = useState(true); 

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
    <div className="w-[90%] md:w-[80%] mx-auto p-4 mb-6 shadow-lg rounded-lg">
        <h3 className="font-bold mb-2 text-blue-400 text-2xl">Add New Ticket</h3>
        <input
          className="border rounded-lg text-blue-400 border-blue-400 p-2 m-2"
          placeholder="Event Name"
          value={event}
          onChange={(e) => setEvent(e.target.value)}/>
        <input
          className="p-2 m-2 border rounded-lg text-blue-400 border-blue-400 p-2 m-2 "
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}/>
        <label className="m-2 flex items-center">
          <input
            type="checkbox"
            checked={available}
            onChange={(e) => setAvailable(e.target.checked)}
            className="mr-2 bg-blue-400"/>
          Available
        </label>
        <button
          onClick={addTicket}
          className="bg-blue-400 text-white px-4 py-2 rounded-lg">
          Add Ticket
        </button>
      </div>
    </div>
  );
}

export default AddTicket;
