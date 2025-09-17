// models/TaskType.js
export default (sequelize, DataTypes) => {
  const TaskType = sequelize.define("TaskType", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return TaskType;
};