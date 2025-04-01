const express = require("express");
const router = express.Router();
const Student = require("../models/Student-Schema");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dpsfob1ei",
  api_key: "996333827458941",
  api_secret: "EWFryO5Lz0BtJA2OTKANi1v2NFM",
});

// Multer storage setup with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "students", // Folder name in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});
const upload = multer({ storage: storage });

// POST API to add a student
router.post("/add", upload.fields([{ name: "studentImage" }, { name: "passportImage" }]), async (req, res) => {
  try {
    console.log("Received request:", req.body);

    // Validate request body
    const requiredFields = [
      "registrationNumber", "name", "age", "fatherName", "motherName", "country", 
      "passportNumber", "passportIssueDate", "passportExpiryDate", "course", "branch", "yearOfStudy"
    ];
    if (!requiredFields.every(field => req.body[field])) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const { registrationNumber, name, age, fatherName, motherName, country, passportNumber, passportIssueDate, passportExpiryDate, course, branch, yearOfStudy } = req.body;

    // Get Cloudinary URLs
    const studentImage = req.files["studentImage"] ? req.files["studentImage"][0].path : null;
    const passportImage = req.files["passportImage"] ? req.files["passportImage"][0].path : null;

    const newStudent = new Student({
      registrationNumber,
      name,
      age,
      fatherName,
      motherName,
      country,
      studentImage,
      passportImage,
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
router.get("/", async (req, res) => {
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
