import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const StudentProfile = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/students/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch student");
        }
        const data = await response.json();
        setStudent(data);
      } catch (error) {
        console.error("Error fetching student:", error);
      }
    };

    fetchStudent();
  }, [id]);

  if (!student) return <p>Loading student profile...</p>;

  return (
    <div style={{ padding: "30px", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
  <Link to={`/all-student`}>
    <button className="edit-btn" style={{ backgroundColor: "gray" }}>
      ⬅️
    </button>
  </Link>
  <p style={{ marginTop: "10px" }}>
    <Link to={`/update-student/${student._id}`}>
      <button className="edit-btn" style={{ backgroundColor: "gray" }}>
        Edit
      </button>
    </Link>
  </p>
</div>
        
            
      <h2>{student.name}'s Profile</h2>
      <div
        style={{
          maxWidth: "600px",
          margin: "auto",
          textAlign: "left",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          boxShadow: "2px 2px 12px rgba(0,0,0,0.1)"
        }}
      >
        <p><strong>Registration Number:</strong> {student.registrationNumber}</p>
        <p><strong>Passport Number:</strong> {student.passportNumber}</p>
        <p><strong>Age:</strong> {new Date(student.dob).toLocaleDateString()}</p>
        <p><strong>Passport Issue Date:</strong> {new Date(student.passportIssueDate).toLocaleDateString()}</p>
        <p><strong>Passport Expiry Date:</strong> {new Date(student.passportExpiryDate).toLocaleDateString()}</p>
        <p><strong>Course:</strong> {student.course}</p>
        <p><strong>Branch:</strong> {student.branch}</p>
        <p><strong>Year of Study:</strong> {student.yearOfStudy}</p>
        <p><strong>Country:</strong> {student.country}</p>
        <p><strong>Mobile Number:</strong> {student.mobileNumber}</p>
        <p><strong>Batch:</strong> {student.batchOfStudying}</p>
        <p><strong>Visa Number:</strong> {student.visaNumber}</p>
        <p><strong>Visa Issue Date:</strong> {new Date(student.visaIssueDate).toLocaleDateString()}</p>
        <p><strong>Visa Expiry Date:</strong> {new Date(student.visaExpiryDate).toLocaleDateString()}</p>
        <p><strong>FRRO Issue Date:</strong> {new Date(student.frroIssueDate).toLocaleDateString()}</p>
        <p><strong>FRRO Expiry Date:</strong> {new Date(student.frroExpiryDate).toLocaleDateString()}</p>
        <p><strong>Date of Reporting:</strong> {new Date(student.dateOfReporting).toLocaleDateString()}</p>
        <p><strong>Student Status:</strong> {student.studentStatus}</p>
        {student.studentImage && (
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <img
              src={student.studentImage}
              alt="Student"
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "10px",
                objectFit: "cover"
              }}
            />
            {/* <a
      href={student.studentImage}
      download="student_image"
      style={{ textDecoration: "none", color: "black" }}
    >
      Download Image
    </a> */}
          </div>
        )}
        
      </div>
    </div>
  );
};

export default StudentProfile;