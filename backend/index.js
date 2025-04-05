const express = require("express");
const mongoose = require("./api/db"); // Ensure db.js exports mongoose connection
const addStudent = require("./api/Student"); // Import student router
const updateStudent = require("./api/update-student"); // Import update student router
const cors = require("cors");

const app = express();

// ✅ Set CORS Headers
const corsOptions = {
  origin: "https://passport-validiity-check.vercel.app/",
  methods: "GET, POST, PUT, DELETE, OPTIONS, PATCH",
  allowedHeaders: "Content-Type, Authorization",
  credentials: true,
};

app.use(cors(corsOptions)); // Enable CORS with options
// ✅ Use JSON parser with a limit
// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true
// }));
// app.use(cors({
//   origin: "https://passport-validiity-check-fw4thbzrb.vercel.app",
//   credentials: true
// }));
app.use(express.json({ limit: "10mb" }));

// ✅ Serve static files (if using uploads)
app.use("/uploads", express.static("uploads", { maxAge: "1h" }));

// ✅ Use API routes
app.use("/api/students", addStudent);
app.use("/api/students-update", updateStudent); // Ensure this is defined in your routes
app.get("/", (req, res) => {
  res.send("Hello World! Backend is working.");
});


app.listen(3000, () => console.log("Server ready on port 3000."));
module.exports = app;
