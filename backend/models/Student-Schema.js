const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  country: { type: String, required: true },
  passportNumber: { type: String, required: true, unique: true },
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
