import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const UpdateStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({});
  const [studentImage, setStudentImage] = useState(null);
  const [passportImage, setPassportImage] = useState(null);
  const [frroImage, setFrroImage] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/students/${id}`);
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
    const file = e.target.files[0];
    if (e.target.name === "studentImage") setStudentImage(file);
    if (e.target.name === "passportImage") setPassportImage(file);
    if (e.target.name === "frroImage") setFrroImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(student).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    if (studentImage) formData.append("studentImage", studentImage);
    if (passportImage) formData.append("passportImage", passportImage);
    if (frroImage) formData.append("frroImage", frroImage);

    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/students-update/update/${id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 200) {
        alert("Student updated successfully!");
        navigate("/all-student");
      } else {
        alert("Failed to update student.");
      }
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  return (
    <div className="container">
      <Link to={`/student/${id}`}>
        <button className="edit-btn" >
        ⬅️
        </button>
      </Link>

      <h2 className="title">Update Student Details</h2>
      <form
        onSubmit={handleSubmit}
        className="form"
        encType="multipart/form-data"
      >
        {[
          { name: "vuId", placeholder: "VU ID" },
          { name: "registrationNumber", placeholder: "Registration Number" },
          { name: "name", placeholder: "Name" },
          { name: "country", placeholder: "Country" },
          { name: "course", placeholder: "Course" },
          { name: "branch", placeholder: "Branch" },
          { name: "batchOfStudying", placeholder: "Batch of Studying" },
          { name: "mobileNumber", placeholder: "Mobile Number" },
          { name: "passportNumber", placeholder: "Passport Number" },
          { name: "visaNumber", placeholder: "Visa Number" },
        ].map(({ name, placeholder }) => (
          <input
            key={name}
            type="text"
            name={name}
            value={student[name] || ""}
            onChange={handleChange}
            placeholder={placeholder}
          />
        ))}

        <input
          type="date"
          name="dob"
          value={student.dob ? student.dob.split("T")[0] : ""}
          onChange={handleChange}
        />
        <select
          name="gender"
          value={student.gender || ""}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        {/* IMAGE SECTION WITH PREVIEWS */}
        <div className="image-section">
          <label>Current Student Image:</label>
          {student.studentImage && (
            <img src={student.studentImage} alt="Student" width={150} />
          )}
          <input type="file" name="studentImage" onChange={handleFileChange} />

          <label>Current Passport Image:</label>
          {student.passportImage && (
            <img src={student.passportImage} alt="Passport" width={150} />
          )}
          <input type="file" name="passportImage" onChange={handleFileChange} />

          <label>Current FRRO Image:</label>
          {student.frroImage && (
            <img src={student.frroImage} alt="FRRO" width={150} />
          )}
          <input type="file" name="frroImage" onChange={handleFileChange} />
        </div>

        {[
          { name: "passportIssueDate", label: "Passport Issue Date" },
          { name: "passportExpiryDate", label: "Passport Expiry Date" },
          { name: "frroIssueDate", label: "FRRO Issue Date" },
          { name: "frroExpiryDate", label: "FRRO Expiry Date" },
          { name: "visaIssueDate", label: "Visa Issue Date" },
          { name: "visaExpiryDate", label: "Visa Expiry Date" },
          { name: "dateOfReporting", label: "Date of Reporting" },
        ].map(({ name, label }) => (
          <div key={name}>
            <label>{label}:</label>
            <input
              type="date"
              name={name}
              value={student[name] ? student[name].split("T")[0] : ""}
              onChange={handleChange}
            />
          </div>
        ))}

        <button type="submit">Update Student</button>
      </form>
    </div>
  );
};

export default UpdateStudent;
