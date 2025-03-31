const express = require("express");
const mongoose = require("./api/db"); // Ensure db.js exports mongoose connection
const addStudent = require("./api/Student"); // Import student router
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.json());

// Allow frontend requests
app.use(cors({ origin: "https://passport-validiity-check.vercel.app" }));

// Serve static files for uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/api/students", addStudent);

app.get("/", (req, res) => {
  res.send("Hello World! Backend is working.");
});

// Export app (Needed for Vercel)
module.exports = app;
