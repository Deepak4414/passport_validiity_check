const express = require("express");
const mongoose = require("./api/db"); // Ensure db.js exports mongoose connection
const addStudent = require("./api/Student"); // This should be a router, not a model
const cors = require("cors");

const app = express();
const port = 3000;
app.use("/uploads", express.static("uploads"));

app.use(express.json());
// Allow requests from your frontend
app.use(cors({ origin: "https://passport-validiity-check.vercel.app" }));


// Correct Route Usage
app.use("/api/students", addStudent);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/home", (req, res) => {
  res.send("Welcome to home!");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
