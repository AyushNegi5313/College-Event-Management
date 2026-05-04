import React, { useEffect, useState } from "react";
import API from "../api/axiosConfig";

export default function AdminEvents() {
  const [events, setEvents] = useState([]);

  const loadEvents = async () => {
    const res = await API.get("/events");
    setEvents(res.data);
  };

  const deleteEvent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    await API.delete(`/events/${id}`);
    loadEvents();
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
        <span>MANAGE EVENTS</span>

        <div>
          <button
            onClick={() => (window.location.href = "/admin")}
            style={headerBtn}
          >
            Back
          </button>

          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
            style={headerBtn}
          >
            Logout
          </button>
        </div>
      </div>

      {/* EVENTS LIST */}
      <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
        {events.length === 0 ? (
          <p
            style={{
              color: "black",
              fontSize: "18px",
              textAlign: "center",
              marginTop: 50
            }}
          >
            No events available
          </p>
        ) : (
          events.map((e) => (
            <div
              key={e._id}
              style={{
                background: "white",
                padding: "20px",
                marginBottom: "15px",
                borderRadius: "12px",
                border: "1px solid #ddd",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)"
              }}
            >
              <h2
                style={{
                  margin: 0,
                  marginBottom: 8,
                  color: "black",
                  fontSize: "22px",
                  fontWeight: 700
                }}
              >
                {e.title}
              </h2>

              <p style={info}><b>Type:</b> {e.type}</p>
              <p style={info}><b>From:</b> {new Date(e.fromDate).toLocaleDateString()}</p>
              <p style={info}><b>To:</b> {new Date(e.toDate).toLocaleDateString()}</p>
              <p style={info}><b>Venue:</b> {e.venue}</p>
              <p style={info}><b>Description:</b> {e.description}</p>
              <p style={info}><b>Participants:</b> {e.totalParticipants}</p>

              {e.registrationLink && (
                <p style={info}>
                  <b>Registration Link:</b>{" "}
                  <a href={e.registrationLink} target="_blank" rel="noopener noreferrer">
                    {e.registrationLink}
                  </a>
                </p>
              )}

              <button
                onClick={() => deleteEvent(e._id)}
                style={deleteBtn}
              >
                Delete Event
              </button>
            </div>
          ))
        )}
      </div>
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
  cursor: "pointer",
  fontWeight: "600"
};

const info = {
  color: "black",
  margin: "6px 0",
  fontSize: "15px"
};

const deleteBtn = {
  background: "red",
  color: "white",
  padding: "10px 14px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  marginTop: "15px",
  fontWeight: "700",
  fontSize: "15px"
};
