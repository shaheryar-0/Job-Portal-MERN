const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// DB connect
const connectDB = require("./config/db");
connectDB();

// routes
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applyRoutes = require("./routes/applyRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/apply", applyRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// test job route
app.get("/test-job", async (req, res) => {
  const Job = require("./models/Job");

  const job = await Job.create({
    title: "React Developer",
    company: "Google",
    location: "Remote",
    salary: "2000$",
    description: "Frontend role",
  });

  res.json(job);
});

// start server (MUST BE LAST)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});