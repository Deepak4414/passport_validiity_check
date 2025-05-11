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
        <button className="edit-btn">⬅️</button>
      </Link>

      <h2 className="title">Update Student Details</h2>
      <form onSubmit={handleSubmit} className="form" encType="multipart/form-data">
        {/* Basic Information Section */}
        <fieldset>
          <legend>Basic Information</legend>
          <div className="form-group">
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
            />
            <input
              type="text"
              name="name"
              value={student.name || ""}
              onChange={handleChange}
              placeholder="Name"
            />
            <input
              type="date"
              name="dob"
              value={student.dob ? student.dob.split("T")[0] : ""}
              onChange={handleChange}
              placeholder="Date of Birth"
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
          </div>
        </fieldset>

        {/* Academic Information Section */}
        <fieldset>
          <legend>Academic Information</legend>
          <div className="form-group">
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
          </div>
        </fieldset>

        {/* Contact Information Section */}
        <fieldset>
          <legend>Contact Information</legend>
          <div className="form-group">
            <input
              type="text"
              name="mobileNumber"
              value={student.mobileNumber || ""}
              onChange={handleChange}
              placeholder="Mobile Number"
            />
            Address Mode
            <select 
                name="addressMode" 
                value={student.addressMode} 
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="hostler">Hostler</option>
                <option value="dayscholar">Dayscholar</option>
              </select>
           Current Address<input
              type="text"
              name="currentAddress"
              value={student.currentAddress || ""}
              onChange={handleChange}
              placeholder="Current Address"
            />
          </div>
        </fieldset>

        {/* Student Image Section */}
        <fieldset>
          <legend>Student Image</legend>
          <div className="image-section">
            Student Image{student.studentImage && (
              <img src={student.studentImage} alt="Student" width={150} />
            )}
            <input type="file" name="studentImage" onChange={handleFileChange} />
          </div>
        </fieldset>

        {/* Passport Information Section */}
        <fieldset>
          <legend>Passport Information</legend>
          <div className="form-group">
            Passport Number<input
              type="text"
              name="passportNumber"
              value={student.passportNumber || ""}
              onChange={handleChange}
              placeholder="Passport Number"
            />
            Passport Issue Date<input
              type="date"
              name="passportIssueDate"
              value={student.passportIssueDate ? student.passportIssueDate.split("T")[0] : ""}
              onChange={handleChange}
              placeholder="Passport Issue Date"
            />
            Passport Expiry Date <input
              type="date"
              name="passportExpiryDate"
              value={student.passportExpiryDate ? student.passportExpiryDate.split("T")[0] : ""}
              onChange={handleChange}
              placeholder="Passport Expiry Date"
            />
          </div>
          <div className="image-section">
            Passport Image{student.passportImage && (
              <img src={student.passportImage} alt="Passport" width={150} />
            )}
            <input type="file" name="passportImage" onChange={handleFileChange} />
          </div>
        </fieldset>

        {/* FRRO Information Section */}
        <fieldset>
          <legend>FRRO Information</legend>
          <div className="form-group">
            FRRO Issue Date<input
              type="date"
              name="frroIssueDate"
              value={student.frroIssueDate ? student.frroIssueDate.split("T")[0] : ""}
              onChange={handleChange}
              placeholder="FRRO Issue Date"
            />

            FRRO Expiry Date<input
              type="date"
              name="frroExpiryDate"
              value={student.frroExpiryDate ? student.frroExpiryDate.split("T")[0] : ""}
              onChange={handleChange}
              placeholder="FRRO Expiry Date"
            />
          </div>
          <div className="image-section">
            FRRO Image{student.frroImage && (
            <img src={student.frroImage} alt="FRRO" width={150} />
            )}
            <input type="file" name="frroImage" onChange={handleFileChange} />
          </div>
        </fieldset>

      

        <button type="submit" className="submit-button">Update Student</button>
      </form>
    </div>
  );
};

export default UpdateStudent;