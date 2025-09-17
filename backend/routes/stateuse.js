import express from "express";
import { Status } from "../models/Status.js"; // Sequelize model
const router = express.Router();

// GET /api/statuses
router.get("/", async (req, res) => {
  try {
    const statuses = await Status.findAll();
    res.json(statuses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch statuses" });
  }
});

export default router;
