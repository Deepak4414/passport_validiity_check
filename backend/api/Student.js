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

// GET: Fetch all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find(); // Fetch all students from MongoDB
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

module.exports = router;
