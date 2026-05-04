import React, { useState } from "react";
import API from "../api/axiosConfig";

export default function OrganiserDashboard() {
  const [successMsg, setSuccessMsg] = useState("");

  const [form, setForm] = useState({
    eventName: "",
    eventType: "",
    fromDate: "",
    toDate: "",
    venue: "",
    totalParticipants: "",
    description: "",
    requirements: "",
    registrationLink: ""   // NEW FIELD
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/greensheet", {
        eventName: form.eventName,
        eventType: form.eventType,
        fromDate: form.fromDate,
        toDate: form.toDate,
        venue: form.venue,
        totalParticipants: form.totalParticipants,
        description: form.description,
        requirements: form.requirements,
        registrationLink: form.registrationLink   // SEND NEW FIELD
      });

      setSuccessMsg("Request submitted successfully ✅");
      setTimeout(() => setSuccessMsg(""), 3000);

      setForm({
        eventName: "",
        eventType: "",
        fromDate: "",
        toDate: "",
        venue: "",
        totalParticipants: "",
        description: "",
        requirements: "",
        registrationLink: ""      // RESET
      });
    } catch (err) {
      alert("Failed to submit request");
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        background: "white",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* HEADER */}
      <div
        style={{
          background: "#0d6efd",
          color: "white",
          padding: "18px",
          fontSize: "26px",
          fontWeight: 700,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <span>ORGANISER DASHBOARD</span>

        <div>
          <button
            onClick={() => window.location.href = "/organiser/requests"}
            style={headerBtn}
          >
            View My Requests
          </button>

          <button
            onClick={() => { localStorage.clear(); window.location.href = "/"; }}
            style={headerBtn}
          >
            Logout
          </button>
        </div>
      </div>

      {/* FORM SECTION */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            background: "#fff",
            padding: "30px",
            borderRadius: "16px",
            width: "500px",
            boxShadow: "0px 0px 20px rgba(0,0,0,0.20)"
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: 20,
              color: "darkgreen",
              fontWeight: 800
            }}
          >
            Submit Green Sheet
          </h2>

          <input style={inp} type="text" name="eventName" placeholder="Event Name" value={form.eventName} onChange={handleChange} required />
          <input style={inp} type="text" name="eventType" placeholder="Event Type" value={form.eventType} onChange={handleChange} required />

          <label style={dateLabel}>From Date</label>
          <input style={inp} type="date" name="fromDate" value={form.fromDate} onChange={handleChange} required />

          <label style={dateLabel}>To Date</label>
          <input style={inp} type="date" name="toDate" value={form.toDate} onChange={handleChange} required />

          <input style={inp} type="text" name="venue" placeholder="Venue" value={form.venue} onChange={handleChange} required />
          <input style={inp} type="number" name="totalParticipants" placeholder="Total Participants" value={form.totalParticipants} onChange={handleChange} required />

          <textarea style={{ ...inp, height: 70 }} name="description" placeholder="Event Description" value={form.description} onChange={handleChange} required />
          <textarea style={{ ...inp, height: 70 }} name="requirements" placeholder="Requirements" value={form.requirements} onChange={handleChange} required />

          {/* NEW FIELD */}
          <input
            style={inp}
            type="text"
            name="registrationLink"
            placeholder="Registration Link (Google Form / Website)"
            value={form.registrationLink}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              background: "#0d6efd",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "18px"
            }}
          >
            Submit Request
          </button>
        </form>
      </div>

      {successMsg && (
        <div
          style={{
            position: "fixed",
            bottom: "25px",
            right: "25px",
            background: "green",
            color: "white",
            padding: "14px 18px",
            borderRadius: "8px",
            fontWeight: "600",
            boxShadow: "0px 0px 10px rgba(0,0,0,0.3)"
          }}
        >
          {successMsg}
        </div>
      )}
    </div>
  );
}

const headerBtn = {
  background: "white",
  color: "#0d6efd",
  border: "none",
  padding: "8px 12px",
  borderRadius: "6px",
  marginLeft: "10px",
  fontWeight: "600",
  cursor: "pointer"
};

const dateLabel = {
  fontWeight: "600",
  color: "white",
  background: "#0d6efd",
  padding: "4px 6px",
  borderRadius: "5px",
  marginBottom: "6px",
  display: "inline-block"
};

const inp = {
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "15px"
};
