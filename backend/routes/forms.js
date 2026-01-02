import express from "express";
import { Form } from "../models/Form.js";
import { Question } from "../models/Question.js";
import { Option } from "../models/Option.js";
import { Teacher } from "../models/Teacher.js";

const router = express.Router();

// Create a form with questions + options (teacherId required)
router.post("/", async (req, res) => {
  const { title, description, teacherId, questions } = req.body;
  if (!teacherId) return res.status(400).json({ error: "teacherId is required" });

  try {
    const teacher = await Teacher.findByPk(teacherId);
    if (!teacher) return res.status(404).json({ error: "Teacher not found" });

    const form = await Form.create({ title, description, TeacherId: teacherId });

    // Create questions and options
    for (const q of questions) {
      const question = await Question.create({ text: q.text, FormId: form.id });
      for (const opt of q.options) {
        await Option.create({
          text: opt.text,
          isCorrect: !!opt.isCorrect,
          QuestionId: question.id
        });
      }
    }

    const fullForm = await Form.findByPk(form.id, {
      include: { model: Question, include: [Option] }
    });

    res.json(fullForm);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// List all forms (with teacher)
router.get("/", async (_req, res) => {
  const forms = await Form.findAll({ include: Teacher });
  res.json(forms);
});

// Get one form with questions/options
router.get("/:id", async (req, res) => {
  const form = await Form.findByPk(req.params.id, {
    include: [{ model: Question, include: [Option] }, Teacher]
  });
  if (!form) return res.status(404).json({ error: "Form not found" });
  res.json(form);
});

export default router;
