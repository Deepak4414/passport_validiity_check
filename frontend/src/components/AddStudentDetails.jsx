import React, { useState } from "react";
import axios from "axios";
import "./AddStudent.css";

const AddStudentDetails = () => {
  const [student, setStudent] = useState({
    vuId: "",
    registrationNumber: "",
    name: "",
    dob: "",
    gender: "",
    country: "",
    course: "",
    branch: "",
    batchOfStudying: "",
    mobileNumber: "",
    passportNumber: "",
    passportIssueDate: "",
    passportExpiryDate: "",
    frroIssueDate: "",
    frroExpiryDate: "",
    dateOfReporting: "",
    visaNumber: "",
    visaIssueDate: "",
    visaExpiryDate: "",
  });

  const [studentImage, setStudentImage] = useState(null);
  const [passportImage, setPassportImage] = useState(null);
  const [frroImage, setFrroImage] = useState(null);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.name === "studentImage") setStudentImage(e.target.files[0]);
    if (e.target.name === "passportImage") setPassportImage(e.target.files[0]);
    if (e.target.name === "frroImage") setFrroImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(student).forEach((key) => {
      formData.append(key, student[key]);
    });

    if (studentImage) formData.append("studentImage", studentImage);
    if (passportImage) formData.append("passportImage", passportImage);
    if (frroImage) formData.append("frroImage", frroImage);

    try {
      const response = await axios.post(
        // "https://passport-validiity-check-2bbw.vercel.app/api/students/add",
        "http://localhost:3000/api/students/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("Student added successfully!");
        setStudent({
          vuId: "",
          registrationNumber: "",
          name: "",
          dob: "",
          gender: "",
          country: "",
          course: "",
          branch: "",
          batchOfStudying: "",
          mobileNumber: "",
          passportNumber: "",
          passportIssueDate: "",
          passportExpiryDate: "",
          frroIssueDate: "",
          frroExpiryDate: "",
          dateOfReporting: "",
          visaNumber: "",
          visaIssueDate: "",
          visaExpiryDate: "",
        });
        setStudentImage(null);
        setPassportImage(null);
        setFrroImage(null);
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
        <fieldset>
          <legend>Student Information</legend>
          <div className="vertical-layout">
            <span>
              <label>VU ID:</label>
              <input type="text" name="vuId" value={student.vuId} onChange={handleChange} placeholder="VU ID" required />
            </span>
            <span>
              <label>Registration Number:</label>
              <input type="text" name="registrationNumber" value={student.registrationNumber} onChange={handleChange} placeholder="Registration Number" required />
            </span>
          </div>
          <div className="horizontal-layout">
            <span>
              <label>Name:</label>
              <input type="text" name="name" value={student.name} onChange={handleChange} placeholder="Name" required />
            </span>
            <span>
              <label>Date of Birth:</label>
              <input type="date" name="dob" value={student.dob} onChange={handleChange} required />
            </span>
          </div>
          <div className="horizontal-layout">
            <span>
              <label>Gender:</label>
              <select name="gender" value={student.gender} onChange={handleChange} required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </span>
            <span>
              <label>Country:</label>
              <input type="text" name="country" value={student.country} onChange={handleChange} placeholder="Country" required />
            </span>
          </div>
        </fieldset>

        <fieldset>
          <legend>Contact Information</legend>
          <div className="vertical-layout">
            <span>
              <label>Course:</label>
              <input type="text" name="course" value={student.course} onChange={handleChange} placeholder="Course" required />
            </span>
            <span>
              <label>Branch:</label>
              <input type="text" name="branch" value={student.branch} onChange={handleChange} placeholder="Branch" required />
            </span>
          </div>
          <div className="horizontal-layout">
            <span>
              <label>Batch of Studying:</label>
              <input type="text" name="batchOfStudying" value={student.batchOfStudying} onChange={handleChange} placeholder="Batch of Studying" required />
            </span>
            <span>
              <label>Mobile Number:</label>
              <input type="tel" name="mobileNumber" value={student.mobileNumber} onChange={handleChange} placeholder="Mobile Number" required />
            </span>
          </div>
        </fieldset>

        <fieldset>
          <legend>Student Image</legend>
          <div className="vertical-layout">
            <span>
              <label>Student Image:</label>
              <input type="file" name="studentImage" onChange={handleFileChange} required />
            </span>
          </div>
        </fieldset>

        <fieldset>
          <legend>Passport Information</legend>
          <div className="vertical-layout">
            <span>
              <label>Passport Number:</label>
              <input type="text" name="passportNumber" value={student.passportNumber} onChange={handleChange} placeholder="Passport Number" required />
            </span>
            <span>
              <label>Passport Issue Date:</label>
              <input type="date" name="passportIssueDate" value={student.passportIssueDate} onChange={handleChange} required />
            </span>
          </div>
          <div className="horizontal-layout">
            <span>
              <label>Passport Expiry Date:</label>
              <input type="date" name="passportExpiryDate" value={student.passportExpiryDate} onChange={handleChange} required />
            </span>
            <span>
              <label>Passport Image:</label>
              <input type="file" name="passportImage" onChange={handleFileChange} required />
            </span>
          </div>
        </fieldset>

        <fieldset>
          <legend>FRRO Information</legend>
          <div className="vertical-layout">
            <span>
              <label>FRRO Issue Date:</label>
              <input type="date" name="frroIssueDate" value={student.frroIssueDate} onChange={handleChange} required />
            </span>
            <span>
              <label>FRRO Expiry Date:</label>
              <input type="date" name="frroExpiryDate" value={student.frroExpiryDate} onChange={handleChange} required />
            </span>
          </div>
          <div className="horizontal-layout">
            <span>
              <label>FRRO Image:</label>
              <input type="file" name="frroImage" onChange={handleFileChange} required />
            </span>
          </div>
        </fieldset>

        <fieldset>
          <legend>Visa Information</legend>
          <div className="vertical-layout">
            <span>
              <label>Date of Reporting:</label>
              <input type="date" name="dateOfReporting" value={student.dateOfReporting} onChange={handleChange} required />
            </span>
            <span>
              <label>Visa Number:</label>
              <input type="text" name="visaNumber" value={student.visaNumber} onChange={handleChange} placeholder="Visa Number" required />
            </span>
          </div>
          <div className="horizontal-layout">
            <span>
              <label>Visa Issue Date:</label>
              <input type="date" name="visaIssueDate" value={student.visaIssueDate} onChange={handleChange} required />
            </span>
            <span>
              <label>Visa Expiry Date:</label>
              <input type="date" name="visaExpiryDate" value={student.visaExpiryDate} onChange={handleChange} required />
            </span>
          </div>
        </fieldset>

        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudentDetails;