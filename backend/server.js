import express from "express";
import cors from "cors";
import { sequelize } from "./db.js";
import "./models/Teacher.js";
import "./models/Form.js";
import "./models/Question.js";
import "./models/Option.js";
import "./models/Submission.js";
import "./models/Answer.js";

import teachersRouter from "./routes/teachers.js";
import formsRouter from "./routes/forms.js";
import submissionsRouter from "./routes/submissions.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/teachers", teachersRouter);
app.use("/api/forms", formsRouter);
app.use("/api/submissions", submissionsRouter);

(async () => {
  await sequelize.sync({ force: true });
  console.log("Database synced");
})();

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
