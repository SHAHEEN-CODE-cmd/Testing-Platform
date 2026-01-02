import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Teacher = sequelize.define("Teacher", {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false }
});
