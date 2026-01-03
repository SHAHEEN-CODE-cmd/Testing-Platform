import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getForm, submitAnswers } from "../api.js";
import MCQQuestion from "../components/MCQQuestion.jsx";

export default function TakeForm() {
  const { formId } = useParams();
  const [form, setForm] = useState(null);
  const [studentName, setStudentName] = useState("");
  const [answers, setAnswers] = useState({}); // { questionId: optionId }
  const [result, setResult] = useState(null);

  useEffect(() => {
    getForm(formId).then(res => setForm(res.data));
  }, [formId]);

  const handleSelect = (questionId, optionId) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const handleSubmit = async () => {
    if (!studentName) return alert("Enter your name");
    const payload = {
      formId: Number(formId),
      studentName,
      answers: Object.entries(answers).map(([questionId, optionId]) => ({
        questionId: Number(questionId),
        optionId
      }))
    };
    const res = await submitAnswers(payload);
    setResult(res.data);
  };

  if (!form) return <div>Loading...</div>;

  return (
    <div>
      <h1>{form.title}</h1>
      <p>{form.description}</p>
      <p><b>Teacher:</b> {form.Teacher?.name}</p>

      <input
        type="text"
        placeholder="Your name"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
      />

      {form.Questions.map(q => (
        <MCQQuestion
          key={q.id}
          q={q}
          selectedOptionId={answers[q.id]}
          onSelect={(optionId) => handleSelect(q.id, optionId)}
        />
      ))}

      <div className="row">
        <button className="primary" onClick={handleSubmit}>Submit</button>
      </div>

      {result && (
        <div className="card success">
          <h3>Score: {result.score} / {result.total}</h3>
          <p>Submission ID: {result.submissionId}</p>
        </div>
      )}
    </div>
  );
}
