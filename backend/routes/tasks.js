import express from "express";
import Task from "../models/index.js";

const router = express.Router();

// GET all tasks
router.get("/", async (req, res) => {
  const tasks = await Task.findAll(); // Fetch all tasks from DB
  res.json(tasks); // Return tasks as JSON
});

// POST create a new task
router.post("/", async (req, res) => {
  const task = await Task.create(req.body); // Create a new task using request body
  res.json(task); // Return the created task
});

// PUT update a task by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByPk(id); // Find task by primary key
  if (!task) return res.status(404).json({ message: "Task not found" });
  await task.update(req.body); // Update task with new data
  res.json(task);
});

// DELETE task by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const task = await Task.findByPk(id); // Find task
  if (!task) return res.status(404).json({ message: "Task not found" });
  await task.destroy(); // Delete task
  res.json({ message: "Task deleted" });
});

export default router;
