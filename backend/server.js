import express from "express";
import dotenv from "dotenv";
import sequelize from "./db.js"; // DB connection
import taskRoutes from "./routes/tasks.js"; // ✅ make sure file exists with .js extension
import cors from "cors";

import statusRoutes from "./routes/statuses.js";
import priorityRoutes from "./routes/priorities.js";
import taskTypeRoutes from "./routes/taskTypes.js";

dotenv.config();

const app = express();

// Enable CORS so frontend can call backend
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Mount the task routes at /api/tasks
app.use("/api/tasks", taskRoutes);
app.use("/api/statuses", statusRoutes);
app.use("/api/priorities", priorityRoutes);
app.use("/api/task-types", taskTypeRoutes);

// Define the port
const PORT = process.env.PORT || 5000;

// Connect to DB and start server
sequelize
  .authenticate() // Check DB connection
  .then(() => {
    console.log("Database connected...");
    return sequelize.sync(); // Sync models to DB
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("Unable to connect to DB:", err));


