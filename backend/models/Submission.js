import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { Form } from "./Form.js";

export const Submission = sequelize.define("Submission", {
  studentName: { type: DataTypes.STRING, allowNull: false },
  score: { type: DataTypes.INTEGER, defaultValue: 0 },
  total: { type: DataTypes.INTEGER, defaultValue: 0 }
});

Submission.belongsTo(Form, { foreignKey: { allowNull: false }, onDelete: "CASCADE" });
Form.hasMany(Submission, { onDelete: "CASCADE" });
