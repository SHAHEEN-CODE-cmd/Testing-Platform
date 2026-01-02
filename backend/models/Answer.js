import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { Submission } from "./Submission.js";
import { Question } from "./Question.js";
import { Option } from "./Option.js";

export const Answer = sequelize.define("Answer", {
  isCorrect: { type: DataTypes.BOOLEAN, defaultValue: false }
});

Answer.belongsTo(Submission, { foreignKey: { allowNull: false }, onDelete: "CASCADE" });
Submission.hasMany(Answer, { onDelete: "CASCADE" });

Answer.belongsTo(Question, { foreignKey: { allowNull: false }, onDelete: "CASCADE" });
Question.hasMany(Answer, { onDelete: "CASCADE" });

Answer.belongsTo(Option, { foreignKey: { allowNull: false }, onDelete: "CASCADE" });
Option.hasMany(Answer, { onDelete: "CASCADE" });
