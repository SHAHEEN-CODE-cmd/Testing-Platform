import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import TeacherDashboard from "./pages/TeacherDashboard.jsx";
import CreateForm from "./pages/CreateForm.jsx";
import TakeForm from "./pages/TakeForm.jsx";
import Results from "./pages/Results.jsx";

export default function App() {
  return (
    <div className="container">
      <nav className="nav">
        <Link to="/">Teacher Dashboard</Link>
        <Link to="/create">Create Form</Link>
        <Link to="/results">Results</Link>
      </nav>

      <Routes>
        <Route path="/" element={<TeacherDashboard />} />
        <Route path="/create" element={<CreateForm />} />
        <Route path="/take/:formId" element={<TakeForm />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </div>
  );
}
