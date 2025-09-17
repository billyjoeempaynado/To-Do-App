// models/Status.js
export default (sequelize, DataTypes) => {
  const Status = sequelize.define("Status", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Status;
};