import express from "express";
import { Teacher } from "../models/Teacher.js";

const router = express.Router();

// Simple seed/register teacher (no auth for demo)
router.post("/", async (req, res) => {
  try {
    const teacher = await Teacher.create(req.body);
    res.json(teacher);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.get("/", async (_req, res) => {
  const teachers = await Teacher.findAll();
  res.json(teachers);
});

export default router;
