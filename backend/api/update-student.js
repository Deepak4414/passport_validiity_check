const express = require("express");
const router = express.Router();
const Student = require("../models/Student-Schema");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// Cloudinary Config
cloudinary.config({
  cloud_name: "dpsfob1ei",
  api_key: "996333827458941",
  api_secret: "EWFryO5Lz0BtJA2OTKANi1v2NFM",
});

// Multer Storage Setup for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "students",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage: storage });

// **UPDATE STUDENT DETAILS API**
router.put("/update/:id", upload.fields([{ name: "studentImage" }, { name: "passportImage" }, { name: "frroImage" }]), async (req, res) => {
  try {
    const studentId = req.params.id;
    let updateData = { ...req.body };

    // Handle Image Updates
    if (req.files["studentImage"]) updateData.studentImage = req.files["studentImage"][0].path;
    if (req.files["passportImage"]) updateData.passportImage = req.files["passportImage"][0].path;
    if (req.files["frroImage"]) updateData.frroImage = req.files["frroImage"][0].path;

    // Update student record in MongoDB
    const updatedStudent = await Student.findByIdAndUpdate(studentId, updateData, { new: true });

    if (!updatedStudent) return res.status(404).json({ error: "Student not found" });

    res.status(200).json({ message: "Student updated successfully!", updatedStudent });
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ error: "Failed to update student" });
  }
});

module.exports = router;
