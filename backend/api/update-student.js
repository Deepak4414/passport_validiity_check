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

router.put(
  "/update/:id",
  upload.fields([
    { name: "studentImage", maxCount: 1 },
    { name: "passportImage", maxCount: 1 },
    { name: "frroImage", maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      const studentId = req.params.id;
      const student = await Student.findById(studentId);

      if (!student) return res.status(404).json({ error: "Student not found" });

      let updateData = { ...req.body };

      // === Cloudinary Image Deletion Helper ===
      const deleteOldImage = async (url) => {
        if (!url) return;
        const parts = url.split("/");
        const filename = parts[parts.length - 1];
        const publicId = `students/${filename.split(".")[0]}`;
        try {
          await cloudinary.uploader.destroy(publicId);
          console.log("Deleted from Cloudinary:", publicId);
        } catch (err) {
          console.error("Cloudinary deletion error:", err);
        }
      };

      // === Handle New Image Uploads and Old Image Deletion ===
      if (req.files["studentImage"]) {
        await deleteOldImage(student.studentImage);
        updateData.studentImage = req.files["studentImage"][0].path;
      }
      if (req.files["passportImage"]) {
        await deleteOldImage(student.passportImage);
        updateData.passportImage = req.files["passportImage"][0].path;
      }
      if (req.files["frroImage"]) {
        await deleteOldImage(student.frroImage);
        updateData.frroImage = req.files["frroImage"][0].path;
      }

      // === Update student in DB ===
      const updatedStudent = await Student.findByIdAndUpdate(studentId, updateData, {
        new: true
      });

      res.status(200).json({
        message: "Student updated successfully!",
        updatedStudent
      });
    } catch (error) {
      console.error("Error updating student:", error);
      res.status(500).json({ error: "Failed to update student" });
    }
  }
);
module.exports = router;
