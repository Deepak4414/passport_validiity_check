const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  vuId: { type: String, required: true, unique: true }, // VU ID
  registrationNumber: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  dob: { type: Date, required: true }, // Date of Birth
  gender: { type: String, required: true, enum: ["Male", "Female", "Other"] }, // Gender field
  country: { type: String, required: true },
  course: { type: String, required: true },
  branch: { type: String, required: true },
  batchOfStudying: { type: String, required: true }, // Batch
  mobileNumber: { type: String, required: true, unique: true }, // Mobile Number
  studentImage: { type: String }, // Student image file path
  passportImage: { type: String }, // Passport image file path
  passportNumber: { type: String, required: true, unique: true },
  passportIssueDate: { type: Date, required: true },
  passportExpiryDate: { type: Date, required: true },
  frroImage: { type: String }, // FRRO image file path
  frroIssueDate: { type: Date, required: true },
  frroExpiryDate: { type: Date, required: true },
  dateOfReporting: { type: Date, required: true },
  visaNumber: { type: String, required: true, unique: true },
  visaIssueDate: { type: Date, required: true },
  visaExpiryDate: { type: Date, required: true },
});

// Create and export the model
module.exports = mongoose.model("Student", StudentSchema);
