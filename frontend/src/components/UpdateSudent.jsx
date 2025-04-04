import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
// import "./UpdateStudent.css";

const UpdateStudent = () => {
  const { id } = useParams(); // Get student ID from URL
  const [student, setStudent] = useState({});
  const [studentImage, setStudentImage] = useState(null);
  const [passportImage, setPassportImage] = useState(null);
  const [frroImage, setFrroImage] = useState(null);

  // Fetch existing student data
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`https://passport-validiity-check-2bbw.vercel.app/api/students/${id}`);
        setStudent(response.data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudent();
  }, [id]);

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

    // Append only the updated fields
    Object.keys(student).forEach((key) => {
      if (student[key]) {
        formData.append(key, student[key]);
      }
    });

    if (studentImage) formData.append("studentImage", studentImage);
    if (passportImage) formData.append("passportImage", passportImage);
    if (frroImage) formData.append("frroImage", frroImage);

    try {
      const response = await axios.put(
        `https://localhost:3000/api/students/update/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        alert("Student details updated successfully!");
      } else {
        alert("Error updating student details");
      }
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  return (
    <div className="container">
      <h2 className="title">Update Student Details</h2>
      <form onSubmit={handleSubmit} className="form" encType="multipart/form-data">
        <input
          type="text"
          name="vuId"
          value={student.vuId || ""}
          onChange={handleChange}
          placeholder="VU ID"
        />
        <input
          type="text"
          name="registrationNumber"
          value={student.registrationNumber || ""}
          onChange={handleChange}
          placeholder="Registration Number"
          required
        />
        <input
          type="text"
          name="name"
          value={student.name || ""}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="date"
          name="dob"
          value={student.dob ? student.dob.split("T")[0] : ""}
          onChange={handleChange}
          placeholder="Date of Birth"
        />
        <select name="gender" value={student.gender || ""} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="text"
          name="country"
          value={student.country || ""}
          onChange={handleChange}
          placeholder="Country"
        />
        <input
          type="text"
          name="course"
          value={student.course || ""}
          onChange={handleChange}
          placeholder="Course"
        />
        <input
          type="text"
          name="branch"
          value={student.branch || ""}
          onChange={handleChange}
          placeholder="Branch"
        />
        <input
          type="text"
          name="batchOfStudying"
          value={student.batchOfStudying || ""}
          onChange={handleChange}
          placeholder="Batch of Studying"
        />
        <input
          type="text"
          name="mobileNumber"
          value={student.mobileNumber || ""}
          onChange={handleChange}
          placeholder="Mobile Number"
        />

        <label>Student Image:</label>
        <input type="file" name="studentImage" onChange={handleFileChange} />

        <label>Passport Image:</label>
        <input type="file" name="passportImage" onChange={handleFileChange} />

        <label>FRRO Image:</label>
        <input type="file" name="frroImage" onChange={handleFileChange} />

        <input
          type="text"
          name="passportNumber"
          value={student.passportNumber || ""}
          onChange={handleChange}
          placeholder="Passport Number"
        />
        <input
          type="date"
          name="passportIssueDate"
          value={student.passportIssueDate ? student.passportIssueDate.split("T")[0] : ""}
          onChange={handleChange}
        />
        <input
          type="date"
          name="passportExpiryDate"
          value={student.passportExpiryDate ? student.passportExpiryDate.split("T")[0] : ""}
          onChange={handleChange}
        />
        <input
          type="date"
          name="frroIssueDate"
          value={student.frroIssueDate ? student.frroIssueDate.split("T")[0] : ""}
          onChange={handleChange}
        />
        <input
          type="date"
          name="frroExpiryDate"
          value={student.frroExpiryDate ? student.frroExpiryDate.split("T")[0] : ""}
          onChange={handleChange}
        />
        <input
          type="date"
          name="dateOfReporting"
          value={student.dateOfReporting ? student.dateOfReporting.split("T")[0] : ""}
          onChange={handleChange}
        />
        <input
          type="text"
          name="visaNumber"
          value={student.visaNumber || ""}
          onChange={handleChange}
          placeholder="Visa Number"
        />
        <input
          type="date"
          name="visaIssueDate"
          value={student.visaIssueDate ? student.visaIssueDate.split("T")[0] : ""}
          onChange={handleChange}
        />
        <input
          type="date"
          name="visaExpiryDate"
          value={student.visaExpiryDate ? student.visaExpiryDate.split("T")[0] : ""}
          onChange={handleChange}
        />

        <button type="submit">Update Student</button>
      </form>
    </div>
  );
};

export default UpdateStudent;
