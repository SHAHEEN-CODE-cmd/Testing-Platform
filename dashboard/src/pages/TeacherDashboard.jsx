import React, { useEffect, useState } from "react";
import { getForms, getTeachers } from "../api.js";
import { Link } from "react-router-dom";

export default function TeacherDashboard() {
  const [forms, setForms] = useState([]);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    getForms().then(res => setForms(res.data));
    getTeachers().then(res => setTeachers(res.data));
  }, []);

  return (
    <div>
      <h1>Teacher Dashboard</h1>
      <p><Link to="/create" className="btn">+ Create New Form</Link></p>

      <h3>All Forms</h3>
      <div className="grid">
        {forms.map(f => (
          <div key={f.id} className="card">
            <h4>{f.title}</h4>
            <p>{f.description}</p>
            <p><b>By:</b> {f.Teacher?.name}</p>
            <div className="row">
              <Link to={`/take/${f.id}`} className="btn primary">Open for Students</Link>
            </div>
          </div>
        ))}
      </div>

      <h3>Teachers</h3>
      <ul>
        {teachers.map(t => <li key={t.id}>{t.name} ({t.email})</li>)}
      </ul>
    </div>
  );
}
