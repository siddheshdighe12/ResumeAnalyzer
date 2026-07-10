const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load .env FIRST
dotenv.config();

console.log(
  "Groq Key Loaded:",
  process.env.GROQ_API_KEY ? "YES ✅" : "NO ❌"
);

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const analysisRoutes = require("./routes/analysisRoutes");

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/analysis", analysisRoutes);

// Test Route
app.get("/", (req, res) => {
  res.json({
    message: "Resume Analyzer API Running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});