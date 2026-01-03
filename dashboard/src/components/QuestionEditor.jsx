import React from "react";

export default function QuestionEditor({ question, onChange, onRemove }) {
  const updateOption = (idx, field, value) => {
    const options = question.options.map((o, i) => i === idx ? { ...o, [field]: value } : o);
    onChange({ ...question, options });
  };

  const addOption = () => {
    if (question.options.length >= 4) return;
    onChange({ ...question, options: [...question.options, { text: "", isCorrect: false }] });
  };

  return (
    <div className="q-editor">
      <input
        type="text"
        placeholder="Question text"
        value={question.text}
        onChange={(e) => onChange({ ...question, text: e.target.value })}
      />
      <div className="opts">
        {question.options.map((opt, idx) => (
          <div key={idx} className="opt-row">
            <input
              type="text"
              placeholder={`Option ${idx + 1}`}
              value={opt.text}
              onChange={(e) => updateOption(idx, "text", e.target.value)}
            />
            <label>
              <input
                type="radio"
                name={`correct-${question.id}`}
                checked={opt.isCorrect}
                onChange={() => {
                  const updated = question.options.map((o, i) => ({ ...o, isCorrect: i === idx }));
                  onChange({ ...question, options: updated });
                }}
              />
              Correct
            </label>
          </div>
        ))}
      </div>
      <div className="row">
        <button onClick={addOption} disabled={question.options.length >= 4}>+ Add option</button>
        <button onClick={onRemove} className="danger">Remove question</button>
      </div>
    </div>
  );
}
