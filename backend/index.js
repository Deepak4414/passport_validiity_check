const express = require("express");
const mongoose = require("./api/db"); // Ensure db.js exports mongoose connection
const addStudent = require("./api/Student"); // Import student router
const cors = require("cors");

const app = express();

// ✅ Set CORS Headers
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      "https://passport-validiity-check.vercel.app",
      "http://localhost:3000", // Allow localhost
    ];
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET, POST, PUT, DELETE, OPTIONS",
  allowedHeaders: "Content-Type, Authorization",
};

app.use(cors());

// ✅ Use JSON parser with a limit
app.use(express.json({ limit: "10mb" }));

// ✅ Serve static files (if using uploads)
app.use("/uploads", express.static("uploads", { maxAge: "1h" }));

// ✅ Use API routes
app.use("/api/students", addStudent);

app.get("/", (req, res) => {
  res.send("Hello World! Backend is working.");
});
app.get("/deepak", async (req, res) => {
  try {
    console.log("Fetching students...");
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

// ✅ Export app for Vercel
module.exports = app;

// ✅ Set port and listen
const port = process.env.PORT || 3000; // Use environment port or default to 3001

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});