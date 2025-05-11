import React, { useState, useEffect } from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Home = () => {
  const [students, setStudents] = useState([]);
  const [studentStatus, setStudentStatus] = useState({});

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/students`);
        if (!response.ok) throw new Error("Failed to fetch students");

        const data = await response.json();
        const today = new Date();
        const oneMonthLater = new Date();
        oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);

        const filteredStudents = data.filter(student => {
          const expiryDate = new Date(student.frroExpiryDate);
          return expiryDate >= today && expiryDate <= oneMonthLater;
        });

        const defaultStatuses = {};
        filteredStudents.forEach(s => {
          defaultStatuses[s._id] = s.studentStatus || "Not Yet Informed";
        });

        setStudents(filteredStudents);
        setStudentStatus(defaultStatuses);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  const handleStatusChange = async (studentId, newStatus) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/students/${studentId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error("Failed to update status");

      setStudentStatus(prev => ({ ...prev, [studentId]: newStatus }));

      // If applied for renewal, remove student from list
      if (newStatus === "Applied for Renewal") {
        setStudents(prev => prev.filter(s => s._id !== studentId));
      } else {
        // Otherwise update the student in list
        setStudents(prev =>
          prev.map(s =>
            s._id === studentId ? { ...s, studentStatus: newStatus } : s
          )
        );
      }

    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const statusColors = {
    "Informed": "green",
    "Applied for Renewal": "orange",
    "Not Yet Informed": "gray",
  };

  const visibleStudents = students.filter(
    s => studentStatus[s._id] !== "Applied for Renewal"
  );

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Welcome to the International Student Passport</h1>
      <h2>Students with Passport Expiry within 1 Month</h2>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {visibleStudents.length > 0 ? (
          visibleStudents.map((student) => (
            <div
              key={student._id}
              style={{
                position: "relative",
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
              {/* Status Selector */}
              <div style={{ position: "absolute", top: "0px", right: "0px" }}>
                <select
                  value={studentStatus[student._id] || "Not Yet Informed"}
                  onChange={(e) => handleStatusChange(student._id, e.target.value)}
                  style={{
                    padding: "4px 0px",
                    borderRadius: "5px",
                    backgroundColor: statusColors[studentStatus[student._id]] || "#ddd",
                    border: "1px solid #aaa",
                    fontSize: "0.9rem",
                  }}
                >
                  <option value="Not Yet Informed">Not Yet Informed</option>
                  <option value="Informed">Informed ✅</option>
                  <option value="Applied for Renewal">Applied for Renewal 📝</option>
                </select>
              </div>

              {/* Left Details */}
              <div style={{ flex: 1, textAlign: "left" }}>
                <h3>{student.name}</h3>
                <p><strong>Registration Number:</strong> {student.registrationNumber}</p>
                <p><strong>Passport Number:</strong> {student.passportNumber}</p>
                <p><strong>Age:</strong> {new Date(student.dob).toLocaleDateString()}</p>
                <p><strong>FRRO Issue Date:</strong> {new Date(student.frroIssueDate).toLocaleDateString()}</p>
                <p><strong>FRRO Expiry Date:</strong> {new Date(student.frroExpiryDate).toLocaleDateString()}</p>
                <p><strong>Course:</strong> {student.course}</p>
                <p><strong>Branch:</strong> {student.branch}</p>
                <p><strong>Year of Study:</strong> {
                  (() => {
                    const startYear = parseInt(student.batchOfStudying?.split("-")[0]);
                    const endYear = parseInt(student.batchOfStudying?.split("-")[1]);
                    const currentYear = new Date().getFullYear();
                    const yearOfStudy = currentYear - startYear;

                    if (yearOfStudy >= 1 && yearOfStudy <= (endYear - startYear + 1)) {
                      return `${yearOfStudy}`;
                    } else {
                      return "Graduated";
                    }
                  })()
                }</p>
              </div>

              {/* Right Image */}
              <div style={{ marginLeft: "15px", textAlign: "center" }}>
                {student.studentImage ? (
                  <img
                    src={`${student.studentImage}`}
                    alt="Student"
                    style={{ width: "80px", height: "80px", borderRadius: "10px", objectFit: "cover" }}
                  />
                ) : (
                  <div style={{
                    width: "80px", height: "80px", borderRadius: "10px",
                    backgroundColor: "#ddd", display: "flex",
                    alignItems: "center", justifyContent: "center"
                  }}>
                    <span>No Image</span>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No students found with expiry within 1 month.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
