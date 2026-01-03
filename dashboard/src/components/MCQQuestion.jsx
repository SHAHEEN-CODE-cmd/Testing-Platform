import React from "react";

export default function MCQQuestion({ q, selectedOptionId, onSelect }) {
  return (
    <div className="card">
      <h4>{q.text}</h4>
      <div className="opts">
        {q.Options.map(opt => (
          <label key={opt.id} className={`opt ${selectedOptionId === opt.id ? "selected" : ""}`}>
            <input
              type="radio"
              name={`q-${q.id}`}
              checked={selectedOptionId === opt.id}
              onChange={() => onSelect(opt.id)}
            />
            {opt.text}
          </label>
        ))}
      </div>
    </div>
  );
}
