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
      
      <div style={{
        maxWidth: "800px",
        margin: "auto",
        textAlign: "left",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        boxShadow: "2px 2px 12px rgba(0,0,0,0.1)"
      }}>
        {/* Student Image (Top) */}
        {student.studentImage && (
          <div style={{ 
            marginBottom: "20px", 
            textAlign: "center",
            borderBottom: "1px solid #eee",
            paddingBottom: "20px"
          }}>
            <img
              src={student.studentImage}
              alt="Student"
              style={{
                width: "200px",
                height: "250px",
                borderRadius: "10px",
                objectFit: "cover",
                border: "1px solid #ddd"
              }}
            />
          </div>
        )}

        {/* Personal Information Section */}
        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ borderBottom: "1px solid #eee", paddingBottom: "5px" }}>Personal Information</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Gender:</strong> {student.gender}</p>
            <p><strong>Date of Birth:</strong> {new Date(student.dob).toLocaleDateString()}</p>
            <p><strong>Country:</strong> {student.country}</p>
            <p><strong>Mobile Number:</strong> {student.mobileNumber}</p>
            <p><strong>Mode of Staying:</strong> {student.addressMode}</p>
            {student.currentAddress && <p><strong>Current Address:</strong> {student.currentAddress}</p>}
          </div>
        </div>

        {/* Academic Information Section */}
        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ borderBottom: "1px solid #eee", paddingBottom: "5px" }}>Academic Information</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
            <p><strong>VU ID:</strong> {student.vuId}</p>
            <p><strong>Registration Number:</strong> {student.registrationNumber}</p>
            <p><strong>Course:</strong> {student.course}</p>
            <p><strong>Branch:</strong> {student.branch}</p>
            <p><strong>Batch:</strong> {student.batchOfStudying}</p>
          </div>
        </div>

        {/* Passport Information Section */}
        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ borderBottom: "1px solid #eee", paddingBottom: "5px" }}>Passport Information</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
            <p><strong>Passport Number:</strong> {student.passportNumber}</p>
            <p><strong>Issue Date:</strong> {new Date(student.passportIssueDate).toLocaleDateString()}</p>
            <p><strong>Expiry Date:</strong> {new Date(student.passportExpiryDate).toLocaleDateString()}</p>
          </div>
          {student.passportImage && (
            <div style={{ marginTop: "15px", textAlign: "center" }}>
              <img
                src={student.passportImage}
                alt="Passport"
                style={{
                  width: "300px",
                  height: "200px",
                  borderRadius: "5px",
                  objectFit: "cover",
                  border: "1px solid #ddd"
                }}
              />
            </div>
          )}
        </div>

        {/* Visa & FRRO Information Section */}
        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ borderBottom: "1px solid #eee", paddingBottom: "5px" }}>FRRO Information</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
           <p><strong>FRRO Issue Date:</strong> {new Date(student.frroIssueDate).toLocaleDateString()}</p>
            <p><strong>FRRO Expiry Date:</strong> {new Date(student.frroExpiryDate).toLocaleDateString()}</p>
          </div>
          {student.frroImage && (
            <div style={{ marginTop: "15px", textAlign: "center" }}>
              <img
                src={student.frroImage}
                alt="FRRO"
                style={{
                  width: "300px",
                  height: "200px",
                  borderRadius: "5px",
                  objectFit: "cover",
                  border: "1px solid #ddd"
                }}
              />
            </div>
          )}
        </div>

        {/* Status Information */}
        <div>
          <h3 style={{ borderBottom: "1px solid #eee", paddingBottom: "5px" }}>Status</h3>
          <p><strong>Student Status:</strong> {student.studentStatus}</p>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;