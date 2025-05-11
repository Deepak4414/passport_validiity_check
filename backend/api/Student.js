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
    folder: "students",
    allowed_formats: ["jpg", "jpeg", "png"],
    transformation: [{ width: 800, height: 800, crop: "limit" }] // Resize images
  },
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 300 * 1024, // 300KB limit
    files: 3 // Maximum 3 files
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
}).fields([
  { name: "studentImage", maxCount: 1 },
  { name: "passportImage", maxCount: 1 },
  { name: "frroImage", maxCount: 1 }
]);

// Error handling middleware for Multer
const handleMulterErrors = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: "File size too large. Maximum 300KB allowed." });
    }
    return res.status(400).json({ error: err.message });
  } else if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
};

// POST API to add a student
router.post(
  "/add",
  (req, res, next) => {
    upload(req, res, (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      next();
    });
  },
  handleMulterErrors,
  async (req, res) => {
    try {

      // Validate only VU ID is required
      if (!req.body.vuId) {
        return res.status(400).json({ error: "VU ID is required" });
      }

      // Check for duplicate VU ID (only field that needs to be unique)
      const existingStudent = await Student.findOne({ vuId: req.body.vuId });
      if (existingStudent) {
        return res.status(400).json({ error: "Student with this VU ID already exists" });
      }

      // Create student object with only provided fields
      const studentData = {
        vuId: req.body.vuId,
        registrationNumber: req.body.registrationNumber || undefined,
        name: req.body.name || undefined,
        dob: req.body.dob || undefined,
        gender: req.body.gender || undefined,
        country: req.body.country || undefined,
        course: req.body.course || undefined,
        branch: req.body.branch || undefined,
        batchOfStudying: req.body.batchOfStudying || undefined,
        mobileNumber: req.body.mobileNumber || undefined,
        addressMode: req.body.addressMode || undefined,  // New field
        currentAddress: req.body.currentAddress || undefined,  // New field
        passportNumber: req.body.passportNumber || undefined,
        passportIssueDate: req.body.passportIssueDate || undefined,
        passportExpiryDate: req.body.passportExpiryDate || undefined,
        frroIssueDate: req.body.frroIssueDate || undefined,
        frroExpiryDate: req.body.frroExpiryDate || undefined,
        dateOfReporting: req.body.dateOfReporting || undefined,
        studentStatus: "Not Yet Informed"
      };

      // Add image URLs if files were uploaded
      if (req.files) {
        if (req.files["studentImage"]) {
          studentData.studentImage = req.files["studentImage"][0].path;
        }
        if (req.files["passportImage"]) {
          studentData.passportImage = req.files["passportImage"][0].path;
        }
        if (req.files["frroImage"]) {
          studentData.frroImage = req.files["frroImage"][0].path;
        }
      }

      const newStudent = new Student(studentData);
      await newStudent.save();
      
      res.status(201).json({ 
        message: "Student added successfully!",
        studentId: newStudent._id 
      });
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
// PATCH route to update student status
router.patch('/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!["Not Yet Informed", "Informed", "Applied for Renewal"].includes(status)) {
    return res.status(400).json({ error: "Invalid status value" });
  }

  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { studentStatus: status },
      { new: true }
    );
    if (!updatedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(updatedStudent);
    console.log("Student status updated:", updatedStudent);
  } catch (error) {
    res.status(500).json({ error: "Error updating student status" });
  }
});

module.exports = router;
