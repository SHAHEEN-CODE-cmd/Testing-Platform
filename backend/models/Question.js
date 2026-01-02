import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { Form } from "./Form.js";

export const Question = sequelize.define("Question", {
  text: { type: DataTypes.STRING, allowNull: false }
});

Question.belongsTo(Form, { foreignKey: { allowNull: false }, onDelete: "CASCADE" });
Form.hasMany(Question, { onDelete: "CASCADE" });
