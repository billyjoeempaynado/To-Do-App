// models/Priority.js
export default (sequelize, DataTypes) => {
  const Priority = sequelize.define("Priority", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Priority;
};