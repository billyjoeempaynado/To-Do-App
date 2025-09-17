// models/Task.js
import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import Status from "./Status.js";
import Priority from "./Priority.js";
import TaskType from "./TaskType.js";

const Task = sequelize.define("Task", {
  taskName: { type: DataTypes.STRING, allowNull: false },
  assignee: { type: DataTypes.STRING, allowNull: false },
  dueDate: { type: DataTypes.DATEONLY, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
});

// Associations
Task.belongsTo(Status, { foreignKey: "statusId" });
Task.belongsTo(Priority, { foreignKey: "priorityId" });
Task.belongsTo(TaskType, { foreignKey: "taskTypeId" });

export default Task;
