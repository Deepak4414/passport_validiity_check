const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  country: { type: String, required: true },
  studentImage: { type: String }, // Will store file path
  passportImage: { type: String }, // Will store file path
  passportIssueDate: { type: Date, required: true },
  passportExpiryDate: { type: Date, required: true },
  course: { type: String, required: true },
  branch: { type: String, required: true },
  yearOfStudy: { type: Number, required: true },
});

module.exports = mongoose.model("Student", StudentSchema);
