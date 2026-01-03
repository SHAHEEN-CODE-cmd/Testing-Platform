import React, { useEffect, useState } from "react";
import { getForms, getFormSubmissions } from "../api.js";

export default function Results() {
  const [forms, setForms] = useState([]);
  const [formId, setFormId] = useState("");
  const [subs, setSubs] = useState([]);

  useEffect(() => { getForms().then(res => setForms(res.data)); }, []);

  const loadSubs = async () => {
    if (!formId) return;
    const res = await getFormSubmissions(formId);
    setSubs(res.data);
  };

  return (
    <div>
      <h1>Results</h1>
      <select value={formId} onChange={(e) => setFormId(e.target.value)}>
        <option value="">Select form</option>
        {forms.map(f => <option key={f.id} value={f.id}>{f.title}</option>)}
      </select>
      <button onClick={loadSubs}>Load submissions</button>

      <div className="grid">
        {subs.map(s => (
          <div key={s.id} className="card">
            <h4>{s.studentName}</h4>
            <p><b>Score:</b> {s.score}/{s.total}</p>
            <p><b>Submission ID:</b> {s.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
