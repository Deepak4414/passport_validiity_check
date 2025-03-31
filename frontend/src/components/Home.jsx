import React, { useState, useEffect } from "react";

const Home = () => {
  const [students, setStudents] = useState([]);

  // Fetch student details from API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("https://passport-validiity-check-2bbw.vercel.app/api/students");
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
      <h1>Welcome to the International Student Passport</h1>
      <h2>Student Details</h2>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {students.length > 0 ? (
          students.map((student) => (
            <div
              key={student._id}
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
              }}
            >
              {/* Left Section - Student Details */}
              <div style={{ flex: 1, textAlign: "left" }}>
                <h3>{student.name}</h3>
                <p><strong>Age:</strong> {student.age}</p>
                <p><strong>Passport Issue Date:</strong> {new Date(student.passportIssueDate).toLocaleDateString()}</p>
                <p><strong>Passport Expiry Date:</strong> {new Date(student.passportExpiryDate).toLocaleDateString()}</p>
                <p><strong>Course:</strong> {student.course}</p>
                <p><strong>Branch:</strong> {student.branch}</p>
                <p><strong>Year of Study:</strong> {student.yearOfStudy}</p>
              </div>

              {/* Right Section - Student Image */}
              <div style={{ marginLeft: "15px", textAlign: "center" }}>
                {student.studentImage ? (
                  <img
                    src={`http://localhost:3000/${student.studentImage}`} // Assuming the image is stored in 'uploads' folder
                    alt="Student"
                    style={{ width: "80px", height: "80px", borderRadius: "10px", objectFit: "cover" }}
                  />
                ) : (
                  <div style={{ width: "80px", height: "80px", borderRadius: "10px", backgroundColor: "#ddd", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span>No Image</span>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No students found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
