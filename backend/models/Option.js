import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { Question } from "./Question.js";

export const Option = sequelize.define("Option", {
  text: { type: DataTypes.STRING, allowNull: false },
  isCorrect: { type: DataTypes.BOOLEAN, defaultValue: false }
});

Option.belongsTo(Question, { foreignKey: { allowNull: false }, onDelete: "CASCADE" });
Question.hasMany(Option, { onDelete: "CASCADE" });
