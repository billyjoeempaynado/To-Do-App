/** @type {import('sequelize-cli').Seeder} */
export default {
  up: async (queryInterface) => {
    // Runs when you seed the database
    await queryInterface.bulkInsert("Tasks", [
      {
        taskName: "Design Homepage",
        status: "In Progress",
        assignee: "John Doe",
        dueDate: "2025-09-20",
        priority: "High",
        taskType: "UI/UX",
        description: "Main landing page design",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        taskName: "API Setup",
        status: "Pending",
        assignee: "Jane Smith",
        dueDate: "2025-09-25",
        priority: "Medium",
        taskType: "Backend",
        description: "Initialize authentication routes",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: async (queryInterface) => {
    // Undo seed if needed
    await queryInterface.bulkDelete("Tasks", null, {});
  },
};
