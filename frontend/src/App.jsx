import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import StudentHome from "./pages/StudentHome";
import OrganiserDashboard from "./pages/OrganiserDashboard";
import OrganiserRequests from "./pages/OrganiserRequests";
import AdminDashboard from "./pages/AdminDashboard";
import AdminEvents from "./pages/AdminEvents";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/student" element={<StudentHome />} />
        <Route path="/organiser" element={<OrganiserDashboard />} />
        <Route path="/organiser/requests" element={<OrganiserRequests />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/events" element={<AdminEvents />} />
      </Routes>
    </BrowserRouter>
  );
}
