const express = require("express");
const router = express.Router();
const Student = require("../models/Student-Schema");
const multer = require("multer");

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Store images in 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// POST API to add a student
router.post("/add", upload.fields([{ name: "studentImage" }, { name: "passportImage" }]), async (req, res) => {
  try {
    const { registrationNumber,name, age, fatherName, motherName, country,passportNumber,passportIssueDate, passportExpiryDate, course, branch, yearOfStudy } = req.body;

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
    console.error(error);
    res.status(500).json({ error: "Failed to add student" });
  }
});

// GET API to fetch students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

module.exports = router;
