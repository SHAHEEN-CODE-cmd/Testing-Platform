import express from "express";
import { Submission } from "../models/Submission.js";
import { Answer } from "../models/Answer.js";
import { Form } from "../models/Form.js";
import { Question } from "../models/Question.js";
import { Option } from "../models/Option.js";

const router = express.Router();

// Submit answers, auto-calculate score, store per-question answers
router.post("/", async (req, res) => {
  const { formId, studentName, answers } = req.body;
  if (!formId || !studentName || !Array.isArray(answers)) {
    return res.status(400).json({ error: "formId, studentName, answers[] required" });
  }

  const form = await Form.findByPk(formId, { include: [{ model: Question, include: [Option] }] });
  if (!form) return res.status(404).json({ error: "Form not found" });

  const total = form.Questions.length;
  let score = 0;

  const submission = await Submission.create({ FormId: formId, studentName, score: 0, total });

  // answers: [{ questionId, optionId }]
  for (const a of answers) {
    const question = form.Questions.find(q => q.id === a.questionId);
    if (!question) continue;

    const selected = question.Options.find(o => o.id === a.optionId);
    const isCorrect = selected ? !!selected.isCorrect : false;
    if (isCorrect) score++;

    await Answer.create({
      SubmissionId: submission.id,
      QuestionId: question.id,
      OptionId: selected ? selected.id : a.optionId,
      isCorrect
    });
  }

  submission.score = score;
  await submission.save();

  res.json({ submissionId: submission.id, score, total });
});

// Get submissions for a form
router.get("/form/:formId", async (req, res) => {
  const subs = await Submission.findAll({ where: { FormId: req.params.formId } });
  res.json(subs);
});

// Get one submission with answers
router.get("/:id", async (req, res) => {
  const sub = await Submission.findByPk(req.params.id, { include: [Answer] });
  if (!sub) return res.status(404).json({ error: "Submission not found" });
  res.json(sub);
});

export default router;
