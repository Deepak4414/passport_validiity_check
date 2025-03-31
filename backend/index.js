const express = require("express");
const mongoose = require("./api/db"); // Ensure db.js exports mongoose connection
const addStudent = require("./api/Student"); // Import student router
const cors = require("cors");

const app = express();
app.use(express.json());

// ✅ Set CORS Headers
app.use(cors()); // Allow all origins temporarily
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://passport-validiity-check.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// ✅ Serve static files (if using uploads)
app.use("/uploads", express.static("uploads"));

// ✅ Use API routes
app.use("/api/students", addStudent);
app.get("/api/students/show", async (req, res) => {
  try {
    console.log("Fetching students...");
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Failed to fetch students" });
  }
});
app.get("/", (req, res) => {
  res.send("Hello World! Backend is working.");
});

// ✅ Export app for Vercel
module.exports = app;
