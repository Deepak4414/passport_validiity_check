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
const Student = require("../models/Student-Schema");
app.get("/deepak", async (req, res) => {
  try {
    console.log("Fetching students...");
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Failed to fetch students" });
  }
  res.send("Hello World! Backend is working.");
});

app.listen(3000, () => console.log("Server ready on port 3000."));
module.exports = app;
