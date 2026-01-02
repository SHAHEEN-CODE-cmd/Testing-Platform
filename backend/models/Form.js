import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { Teacher } from "./Teacher.js";

export const Form = sequelize.define("Form", {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT }
});

Form.belongsTo(Teacher, { foreignKey: { allowNull: false } });
Teacher.hasMany(Form);
