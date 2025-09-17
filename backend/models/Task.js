// models/Task.js
export default (sequelize, DataTypes) => {
  const Task = sequelize.define("Task", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Task.associate = (models) => {
    Task.belongsTo(models.Status, { foreignKey: "statusId" });
    Task.belongsTo(models.Priority, { foreignKey: "priorityId" });
    Task.belongsTo(models.TaskType, { foreignKey: "taskTypeId" });
  };

  return Task;
};