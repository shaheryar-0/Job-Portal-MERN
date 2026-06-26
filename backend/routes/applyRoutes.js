// const express = require("express");
// const router = express.Router();
// const Application = require("../models/Application");
// const authMiddleware = require("../middleware/authMiddleware");


// // ======================
// // APPLY JOB (SECURED)
// // ======================
// router.post("/", authMiddleware, async (req, res) => {
//   try {
//     const { jobId } = req.body;
//     const userId = req.user.id; // ✅ comes from token

//     if (!jobId) {
//       return res.status(400).json({
//         message: "jobId required",
//       });
//     }

//     const exists = await Application.findOne({ jobId, userId });

//     if (exists) {
//       return res.status(400).json({ message: "Already applied" });
//     }

//     await Application.create({ jobId, userId });

//     res.json({ message: "Applied successfully" });

//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });


// // ======================
// // GET APPLIED JOBS (SECURED)
// // ======================
// router.get("/:userId", authMiddleware, async (req, res) => {
//   try {
//     const applications = await Application.find({
//       userId: req.params.userId,
//     });

//     res.json(applications);

//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const Application = require("../models/Application");
const authMiddleware = require("../middleware/authMiddleware");

// APPLY JOB (SECURE)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { jobId } = req.body;
    const userId = req.user.id; // from JWT

    if (!jobId) {
      return res.status(400).json({
        message: "jobId required",
      });
    }

    const exists = await Application.findOne({ jobId, userId });

    if (exists) {
      return res.status(400).json({ message: "Already applied" });
    }

    await Application.create({ jobId, userId });

    res.json({ message: "Applied successfully" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET USER APPLICATIONS
router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const applications = await Application.find({ userId });

    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;