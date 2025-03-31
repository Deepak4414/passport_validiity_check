const express = require("express");
const router = express.Router();
const Student = require("../models/Student-Schema");
const multer = require("multer");
const path = require("path");

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads")); // Ensure proper path
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// POST API to add a student
router.post("/add", upload.fields([{ name: "studentImage" }, { name: "passportImage" }]), async (req, res) => {
  try {
    console.log("Received request:", req.body);

    const { registrationNumber, name, age, fatherName, motherName, country, passportNumber, passportIssueDate, passportExpiryDate, course, branch, yearOfStudy } = req.body;

    const newStudent = new Student({
      registrationNumber,
      name,
      age,
      fatherName,
      motherName,
      country,
      studentImage: req.files["studentImage"] ? req.files["studentImage"][0].path : null,
      passportImage: req.files["passportImage"] ? req.files["passportImage"][0].path : null,
      passportNumber,
      passportIssueDate,
      passportExpiryDate,
      course,
      branch,
      yearOfStudy,
    });

    await newStudent.save();
    res.status(201).json({ message: "Student added successfully!" });
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({ error: "Failed to add student" });
  }
});

// GET API to fetch students
router.get("/show", async (req, res) => {
  try {
    console.log("Fetching students...");
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

module.exports = router;
