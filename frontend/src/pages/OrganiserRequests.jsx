import React, { useEffect, useState } from "react";
import API from "../api/axiosConfig";

export default function OrganiserRequests() {
  const [myRequests, setMyRequests] = useState([]);

  const loadRequests = async () => {
    const res = await API.get("/greensheet");

    const roleID = localStorage.getItem("userId");

    // FIXED: compare by _id string
    const mine = res.data.filter(r => r.organiser?.toString() === roleID);

    setMyRequests(mine);
  };

  useEffect(() => {
    loadRequests();
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
        <span>MY SUBMITTED REQUESTS</span>

        <div>
          <button
            onClick={() => window.location.href = "/organiser"}
            style={headerBtn}
          >
            Back to Dashboard
          </button>

          <button
            onClick={() => { localStorage.clear(); window.location.href = "/"; }}
            style={headerBtn}
          >
            Logout
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ flex: 1, overflowY: "auto", padding: 25 }}>
        {myRequests.length === 0 ? (
          <p
            style={{
              textAlign: "center",
              fontSize: "18px",
              marginTop: "40px",
              color: "black"
            }}
          >
            No requests available
          </p>
        ) : (
          myRequests.map((r) => (
            <div
              key={r._id}
              style={{
                background: "white",
                padding: "14px",
                borderRadius: "8px",
                marginBottom: "12px",
                border: "1px solid #e3e3e3"
              }}
            >
              <b style={{ fontSize: "18px" }}>{r.eventName}</b><br/>

              From: {new Date(r.fromDate).toLocaleDateString()}<br/>
              To: {new Date(r.toDate).toLocaleDateString()}<br/>
              Venue: {r.venue}<br/><br/>

              {/* STATUS BADGE */}
              <span
                style={{
                  background: statusColor(r.status),
                  color: "white",
                  padding: "4px 10px",
                  borderRadius: "15px",
                  fontWeight: "700",
                  display: "inline-block",
                  marginBottom: "10px",
                  fontSize: "13px",
                  letterSpacing: "0.5px"
                }}
              >
                {r.status.toUpperCase()}
              </span>
              <br/><br/>

              <b>Description:</b> {r.description}<br/>
              <b>Requirements:</b> {r.requirements}
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
  fontWeight: "600",
  cursor: "pointer"
};

const statusColor = (s) => {
  if (s === "approved") return "green";
  if (s === "rejected") return "red";
  return "#ff9900"; // pending
};
