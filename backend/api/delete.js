const express = require("express");
const router = express.Router();
const Student = require("../models/Student-Schema");
const cloudinary = require("cloudinary").v2;



// DELETE student and associated Cloudinary images
router.delete("/students/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const deleteFromCloudinary = async (imageUrl) => {
      if (!imageUrl) return;

      try {
        // Extract public_id (e.g., "students/abcd1234")
        const parts = imageUrl.split("/");
        const filename = parts[parts.length - 1];
        const publicIdWithExt = `students/${filename.split(".")[0]}`;

        await cloudinary.uploader.destroy(publicIdWithExt);
        console.log(`Deleted from Cloudinary: ${publicIdWithExt}`);
      } catch (err) {
        console.error("Error deleting from Cloudinary:", err);
      }
    };

    // Delete all three possible image fields
    await deleteFromCloudinary(student.studentImage);
    await deleteFromCloudinary(student.passportImage);
    await deleteFromCloudinary(student.frroImage);

    // Delete student from DB
    await Student.findByIdAndDelete(req.params.id);

    res.json({ message: "Student and associated images deleted successfully." });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ error: "Failed to delete student." });
  }
});

module.exports = router;
