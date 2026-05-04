import React, { useEffect, useState } from "react";
import API from "../api/axiosConfig";

export default function StudentHome() {
  const [events, setEvents] = useState([]);

  const loadEvents = async () => {
    const res = await API.get("/events");
    const approvedList = res.data.filter(e => e.status === "approved");
    setEvents(approvedList);
  };

  useEffect(() => {
    loadEvents();
  }, []);

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
        <span>STUDENT EVENTS</span>

        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
          style={{
            background: "white",
            color: "#0d6efd",
            border: "none",
            padding: "8px 12px",
            borderRadius: "6px",
            fontWeight: "600",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </div>

      {/* CONTENT */}
      <div style={{ flex: 1, padding: 25, overflowY: "auto" }}>
        {events.length === 0 ? (
          <p style={{ color: "black", textAlign: "center", marginTop: 20 }}>
            No approved events available
          </p>
        ) : (
          events.map((e) => (
            <div
              key={e._id}
              style={{
                background: "white",
                padding: 20,
                marginBottom: 14,
                borderRadius: 10,
                boxShadow: "0 0 10px rgba(0,0,0,0.15)"
              }}
            >
              <h2 style={{ color: "black", marginBottom: 6 }}>{e.title}</h2>

              <p style={{ color: "black" }}><b>From:</b> {new Date(e.fromDate).toLocaleDateString()}</p>
              <p style={{ color: "black" }}><b>To:</b> {new Date(e.toDate).toLocaleDateString()}</p>
              <p style={{ color: "black" }}><b>Venue:</b> {e.venue}</p>
              <p style={{ color: "black", marginTop: 8 }}>{e.description}</p>

              <button
                onClick={() => window.open(e.registrationLink, "_blank")}
                style={{
                  background: "#0d6efd",
                  color: "white",
                  padding: "10px 14px",
                  borderRadius: 8,
                  border: "none",
                  marginTop: 10,
                  cursor: "pointer",
                  fontWeight: 700
                }}
              >
                Register
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
