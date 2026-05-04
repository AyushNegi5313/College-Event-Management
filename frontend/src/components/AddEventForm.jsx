import React, { useState } from "react";
import API from "../api/axiosConfig";

export default function AddEventForm({ onEventAdded }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    venue: "",
    capacity: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/events", formData);
      setMessage("✅ Event added successfully!");
      setFormData({ title: "", description: "", date: "", venue: "", capacity: "" });
      onEventAdded && onEventAdded(res.data);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to add event. Check backend or DB connection.");
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: 20, marginBottom: 20 }}>
      <h2>Add New Event</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Venue:</label>
          <input
            type="text"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Capacity:</label>
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Add Event</button>
      </form>

      {message && <p style={{ marginTop: 10 }}>{message}</p>}
    </div>
  );
}
