import React, { useState } from "react";
import "./AddStudent.css";

const AddStudentDetails = () => {
  const [student, setStudent] = useState({
    registrationNumber: "",
    name: "",
    age: "",
    fatherName: "",
    motherName: "",
    country: "",
    passportNumber: "",
    passportIssueDate: "",
    passportExpiryDate: "",
    course: "",
    branch: "",
    yearOfStudy: "",
  });

  const [studentImage, setStudentImage] = useState(null);
  const [passportImage, setPassportImage] = useState(null);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.name === "studentImage") setStudentImage(e.target.files[0]);
    if (e.target.name === "passportImage") setPassportImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(student).forEach((key) => {
      formData.append(key, student[key]);
    });

    if (studentImage) formData.append("studentImage", studentImage);
    if (passportImage) formData.append("passportImage", passportImage);

    try {
      const response = await fetch("http://localhost:3000/api/students/add", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Student added successfully!");
        setStudent({
        registrationNumber: "",
          name: "",
          age: "",
          fatherName: "",
          motherName: "",
          country: "",
          passportNumber: "",
          passportIssueDate: "",
          passportExpiryDate: "",
          course: "",
          branch: "",
          yearOfStudy: "",
        });
        setStudentImage(null);
        setPassportImage(null);
      } else {
        alert("Error adding student");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <h2 className="title">Add Student Details</h2>
      <form onSubmit={handleSubmit} className="form" encType="multipart/form-data">

        <input type="text" name="registrationNumber" value={student.registrationNumber} onChange={handleChange} placeholder="Registration Number" required />
        <input type="text" name="name" value={student.name} onChange={handleChange} placeholder="Name" required />
        <input type="number" name="age" value={student.age} onChange={handleChange} placeholder="Age" required />
        <input type="text" name="fatherName" value={student.fatherName} onChange={handleChange} placeholder="Father's Name" required />
        <input type="text" name="motherName" value={student.motherName} onChange={handleChange} placeholder="Mother's Name" required />
        <input type="text" name="country" value={student.country} onChange={handleChange} placeholder="Country" required />
        
        <label>Student Image:</label>
        <input type="file" name="studentImage" onChange={handleFileChange} required />

        <label>Passport Image:</label>
        <input type="file" name="passportImage" onChange={handleFileChange} required />

        <input type="text" name="passportNumber" value={student.passportNumber} onChange={handleChange} placeholder="Passport Number" required />
        <input type="date" name="passportIssueDate" value={student.passportIssueDate} onChange={handleChange} required />
        <input type="date" name="passportExpiryDate" value={student.passportExpiryDate} onChange={handleChange} required />
        <input type="text" name="course" value={student.course} onChange={handleChange} placeholder="Course" required />
        <input type="text" name="branch" value={student.branch} onChange={handleChange} placeholder="Branch" required />
        <input type="number" name="yearOfStudy" value={student.yearOfStudy} onChange={handleChange} placeholder="Year of Study" required />

        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudentDetails;
