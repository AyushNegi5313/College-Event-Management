import React, { useState } from "react";
import API from "../api/axiosConfig";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/users/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("userId", res.data.user.id);

      if (res.data.user.role === "admin") window.location.href = "/admin";
      else if (res.data.user.role === "organiser") window.location.href = "/organiser";
      else window.location.href = "/student";
    } catch (err) {
      alert("Invalid login credentials");
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('/college_bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <form
        onSubmit={loginUser}
        style={{
          background: "rgba(255,255,255,0.90)",
          backdropFilter: "blur(8px)",
          padding: "30px",
          borderRadius: "15px",
          width: "380px",
          boxShadow: "0px 0px 20px rgba(0,0,0,0.25)",
          textAlign: "center"
        }}
      >
        <img src="/college_logo.png" style={{ width: 200, marginBottom: 15 }} />

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inp}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inp}
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
          Login
        </button>
      </form>
    </div>
  );
}

const inp = {
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "15px"
};
