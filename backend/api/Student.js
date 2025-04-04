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
router.post(
  "/add",
  upload.fields([
    { name: "studentImage" },
    { name: "passportImage" },
    { name: "frroImage" },
  ]),
  async (req, res) => {
    try {
      console.log("Received request:", req.body);

      // Validate request body
      const requiredFields = [
        "vuId",
        "registrationNumber",
        "name",
        "dob",
        "gender",
        "country",
        "course",
        "branch",
        "batchOfStudying",
        "mobileNumber",
        "passportNumber",
        "passportIssueDate",
        "passportExpiryDate",
        "frroIssueDate",
        "frroExpiryDate",
        "dateOfReporting",
        "visaNumber",
        "visaIssueDate",
        "visaExpiryDate",
      ];

      if (!requiredFields.every((field) => req.body[field])) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const {
        vuId,
        registrationNumber,
        name,
        dob,
        gender,
        country,
        course,
        branch,
        batchOfStudying,
        mobileNumber,
        passportNumber,
        passportIssueDate,
        passportExpiryDate,
        frroIssueDate,
        frroExpiryDate,
        dateOfReporting,
        visaNumber,
        visaIssueDate,
        visaExpiryDate,
      } = req.body;

      // Get Cloudinary URLs
      const studentImage = req.files["studentImage"]
        ? req.files["studentImage"][0].path
        : null;
      const passportImage = req.files["passportImage"]
        ? req.files["passportImage"][0].path
        : null;
      const frroImage = req.files["frroImage"]
        ? req.files["frroImage"][0].path
        : null;

      const newStudent = new Student({
        vuId,
        registrationNumber,
        name,
        dob,
        gender,
        country,
        course,
        branch,
        batchOfStudying,
        mobileNumber,
        studentImage,
        passportImage,
        passportNumber,
        passportIssueDate,
        passportExpiryDate,
        frroImage,
        frroIssueDate,
        frroExpiryDate,
        dateOfReporting,
        visaNumber,
        visaIssueDate,
        visaExpiryDate,
      });

      await newStudent.save();
      res.status(201).json({ message: "Student added successfully!" });
    } catch (error) {
      console.error("Error adding student:", error);
      res.status(500).json({ error: "Failed to add student" });
    }
  }
);

// GET API to fetch students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

// GET student by ID
router.get("/:id", async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error("Error fetching student by ID:", error);
    res.status(500).json({ error: "Failed to fetch student" });
  }
});


module.exports = router;
