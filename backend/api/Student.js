const express = require("express");
const router = express.Router();
const Student = require("../models/Student-Schema");

// POST: Add Student
router.post("/add", async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json({ message: "Student added successfully!", student: newStudent });
  } catch (error) {
    res.status(500).json({ error: "Failed to add student", details: error.message });
  }
});

module.exports = router;
