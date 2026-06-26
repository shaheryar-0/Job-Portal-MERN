const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const authMiddleware = require("../middleware/authMiddleware");

// =======================
// CREATE JOB (ADMIN ONLY)
// =======================
router.post("/create", authMiddleware, async (req, res) => {
  try {
    // check role from JWT
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Admin only can create jobs",
      });
    }

    const job = new Job(req.body);
    await job.save();

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin only" });
    }

    await Job.findByIdAndDelete(req.params.id);

    res.json({ message: "Job deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// =======================
// GET ALL JOBS (PUBLIC)
// =======================
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;