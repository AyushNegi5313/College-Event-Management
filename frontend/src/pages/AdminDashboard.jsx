import React, { useEffect, useState } from "react";
import API from "../api/axiosConfig";

export default function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("pending"); // default pending

  const load = async () => {
    const res = await API.get("/greensheet");
    setRequests(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const approve = async (id) => {
    await API.patch(`/greensheet/${id}/approve`);
    load();
  };

  const reject = async (id) => {
    await API.patch(`/greensheet/${id}/reject`);
    load();
  };

  const filtered = requests.filter(r => filter === "all" ? true : r.status === filter);

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
        <span>ADMIN DASHBOARD</span>

        <div>
          <button
            onClick={() => window.location.href = "/admin/events"}
            style={{
              background: "white",
              color: "#0d6efd",
              border: "none",
              padding: "8px 12px",
              borderRadius: "6px",
              marginRight: "10px",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            Manage Events
          </button>

          <button
            onClick={() => { localStorage.clear(); window.location.href = "/"; }}
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
      </div>

      {/* FILTER */}
      <div style={{ padding: 20 }}>
        <label style={{ fontWeight: 700, marginRight: 10, color: "black" }}>
          Filter Requests:
        </label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1px solid #aaa",
            fontWeight: "600"
          }}
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="all">All</option>
        </select>
      </div>

      {/* LIST */}
      <div style={{ flex: 1, overflowY: "auto", padding: "0 20px" }}>
        {filtered.length === 0 ? (
          <p
            style={{
              textAlign: "center",
              fontSize: "18px",
              color: "black",
              marginTop: 40
            }}
          >
            No requests available
          </p>
        ) : (
          filtered.map((r) => (
            <div
              key={r._id}
              style={{
                background: "#fff",
                padding: "18px",
                borderRadius: "10px",
                border: "1px solid #ddd",
                marginBottom: "14px",
                boxShadow: "0 0 8px rgba(0,0,0,0.12)"
              }}
            >
              <h2 style={{ margin: 0, marginBottom: 6, color: "black" }}>
                {r.eventName}
              </h2>

              <p style={{ color: "black", margin: "4px 0" }}><b>Type:</b> {r.eventType}</p>
              <p style={{ color: "black", margin: "4px 0" }}><b>From:</b> {new Date(r.fromDate).toLocaleDateString()}</p>
              <p style={{ color: "black", margin: "4px 0" }}><b>To:</b> {new Date(r.toDate).toLocaleDateString()}</p>
              <p style={{ color: "black", margin: "4px 0" }}><b>Venue:</b> {r.venue}</p>
              <p style={{ color: "black", margin: "4px 0" }}><b>Participants:</b> {r.totalParticipants}</p>
              <p style={{ color: "black", margin: "4px 0" }}><b>Description:</b> {r.description}</p>
              <p style={{ color: "black", margin: "4px 0" }}><b>Requirements:</b> {r.requirements}</p>

              {r.status === "pending" && (
                <div style={{ marginTop: 10 }}>
                  <button
                    onClick={() => approve(r._id)}
                    style={{
                      background: "green",
                      color: "white",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "none",
                      marginRight: "10px",
                      cursor: "pointer",
                      fontWeight: 700
                    }}
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => reject(r._id)}
                    style={{
                      background: "red",
                      color: "white",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      border: "none",
                      cursor: "pointer",
                      fontWeight: 700
                    }}
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
