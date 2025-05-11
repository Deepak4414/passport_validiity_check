const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  vuId: { type: String, required: true, unique: true }, // Only truly unique field
  registrationNumber: { type: String}, // Sparse index
  name: { type: String },
  dob: { type: Date },
  gender: { 
    type: String, 
    enum: ["Male", "Female", "Other", null],
    default: null 
  },
  country: { type: String },
  course: { type: String },
  branch: { type: String },
  batchOfStudying: { type: String },
  mobileNumber: { type: String}, // Sparse index
  studentImage: { type: String },
  passportImage: { type: String },
  passportNumber: { type: String}, // Sparse index
  passportIssueDate: { type: Date },
  passportExpiryDate: { type: Date },
  frroImage: { type: String },
  frroIssueDate: { type: Date },
  frroExpiryDate: { type: Date },
  dateOfReporting: { type: Date },
  addressMode: {
    type: String,
    enum: ["hostler", "dayscholar", ""], // Allowed values
    default: ""
  },
  currentAddress: {
    type: String,
    trim: true // Automatically trims whitespace
  },
  studentStatus: {
    type: String,
    enum: ["Not Yet Informed", "Informed", "Applied for Renewal"],
    default: "Not Yet Informed"
  },
}, {
  timestamps: true
});

module.exports = mongoose.model("Student", StudentSchema);