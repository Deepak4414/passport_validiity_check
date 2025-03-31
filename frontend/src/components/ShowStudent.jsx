import React, { useState, useEffect } from "react";

const ShowStudent = () => {
  const [students, setStudents] = useState([]);

  // Fetch student details from API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/students");
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

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Student Details</h2>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {students.length > 0 ? (
          students.map((student) => (
            <div
              key={student._id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "20px",
                margin: "10px",
                width: "250px",
                boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
                backgroundColor: "#f9f9f9",
              }}
            >
              <h3>{student.name}</h3>
              <p><strong>Age:</strong> {student.age}</p>
              <p><strong>Country:</strong> {student.country}</p>
              <p><strong>Passport:</strong> {student.passportNumber}</p>
            </div>
          ))
        ) : (
          <p>No students found.</p>
        )}
      </div>
    </div>
  );
};

export default ShowStudent;
