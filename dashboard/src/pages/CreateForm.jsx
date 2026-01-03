import React, { useEffect, useState } from "react";
import { createForm, createTeacher, getTeachers } from "../api.js";
import QuestionEditor from "../components/QuestionEditor.jsx";

export default function CreateForm() {
  const [teacherId, setTeacherId] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([]);

  useEffect(() => { getTeachers().then(res => setTeachers(res.data)); }, []);

  const addQuestion = () => {
    setQuestions(qs => [
      ...qs,
      { id: Date.now(), text: "", options: [{ text: "", isCorrect: false }] }
    ]);
  };

  const updateQuestion = (id, updated) => {
    setQuestions(qs => qs.map(q => q.id === id ? updated : q));
  };

  const removeQuestion = (id) => {
    setQuestions(qs => qs.filter(q => q.id !== id));
  };

  const handleCreateTeacher = async () => {
    const name = prompt("Teacher name?");
    const email = prompt("Teacher email?");
    if (!name || !email) return;
    const res = await createTeacher({ name, email });
    setTeachers(prev => [...prev, res.data]);
    setTeacherId(res.data.id);
  };

  const handleSubmit = async () => {
    if (!teacherId) return alert("Select a teacher");
    if (!title || questions.length === 0) return alert("Add title and at least one question");

    const payload = {
      title,
      description,
      teacherId,
      questions: questions.map(q => ({
        text: q.text,
        options: q.options
      }))
    };

    const res = await createForm(payload);
    alert(`Form created: ${res.data.title}`);
    setTitle(""); setDescription(""); setQuestions([]);
  };

  return (
    <div>
      <h1>Create Form (Teacher)</h1>

      <label>Teacher:</label>
      <div className="row">
        <select value={teacherId} onChange={(e) => setTeacherId(e.target.value)}>
          <option value="">Select teacher</option>
          {teachers.map(t => <option key={t.id} value={t.id}>{t.name} ({t.email})</option>)}
        </select>
        <button onClick={handleCreateTeacher}>+ New teacher</button>
      </div>

      <input type="text" placeholder="Form title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Description (optional)" value={description} onChange={(e) => setDescription(e.target.value)} />

      <div className="row">
        <button onClick={addQuestion}>+ Add question</button>
      </div>

      {questions.map(q => (
        <QuestionEditor
          key={q.id}
          question={q}
          onChange={(updated) => updateQuestion(q.id, updated)}
          onRemove={() => removeQuestion(q.id)}
        />
      ))}

      <div className="row">
        <button className="primary" onClick={handleSubmit}>Save Form</button>
      </div>
    </div>
  );
}
