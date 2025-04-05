import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ShowStudent = () => {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/students`);
        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  const filteredStudents = students.filter((student) => {
    const studentName = student.registrationNumber.toLowerCase();
    const searchQueryLower = searchQuery.toLowerCase();
    return studentName.includes(searchQueryLower);
  });

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Student Details</h2>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by Registration Number"
          style={{ width: "50%", padding: "10px", fontSize: "16px" }}
        />
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student) => (
            <Link
              to={`/student/${student._id}`}
              key={student._id}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  padding: "20px",
                  margin: "10px",
                  width: "400px",
                  boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
                  backgroundColor: "#f9f9f9",
                  cursor: "pointer",
                }}
              >
                {/* Left Section - Student Details */}
                <div style={{ flex: 1, textAlign: "left" }}>
                  <h3>{student.name}</h3>
                  <p><strong>Student ID:</strong> {student.registrationNumber}</p>
                  <p><strong>Passport Number:</strong> {student.passportNumber}</p>
                  <p><strong>Age:</strong> {new Date(student.dob).toLocaleDateString()}</p>
                  <p><strong>Course:</strong> {student.course}</p>
                  <p><strong>Branch:</strong> {student.branch}</p>
                  <p><strong>Year of Study:</strong> {student.yearOfStudy}</p>
                </div>

                {/* Right Section - Student Image */}
                <div style={{ marginLeft: "15px", textAlign: "center" }}>
                  {student.studentImage ? (
                    <img
                      src={`${student.studentImage}`}
                      alt="Student"
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "10px",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "10px",
                        backgroundColor: "#ddd",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span>No Image</span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No students found.</p>
        )}
      </div>
    </div>
  );
};

export default ShowStudent;
