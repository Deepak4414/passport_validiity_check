import React, { useState, useEffect } from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Home = () => {
  const [allStudents, setAllStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [studentStatus, setStudentStatus] = useState({});
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [showMonthFilter, setShowMonthFilter] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/students`);
        if (!response.ok) throw new Error("Failed to fetch students");

        const data = await response.json();
        const today = new Date();
        const oneMonthLater = new Date();
        oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);

        // Set default status for all students
        const defaultStatuses = {};
        data.forEach(s => {
          defaultStatuses[s._id] = s.studentStatus || "Not Yet Informed";
        });

        setAllStudents(data);
        setStudentStatus(defaultStatuses);

        // Filter students with expiry within 1 month by default
        const initialFiltered = data.filter(student => {
          const expiryDate = new Date(student.frroExpiryDate);
          return expiryDate >= today && expiryDate <= oneMonthLater;
        });
        setFilteredStudents(initialFiltered);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    if (!selectedMonth) {
      // Show students with expiry within 1 month when no month is selected
      const today = new Date();
      const oneMonthLater = new Date();
      oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);
      
      const defaultFiltered = allStudents.filter(student => {
        const expiryDate = new Date(student.frroExpiryDate);
        return expiryDate >= today && expiryDate <= oneMonthLater;
      });
      setFilteredStudents(defaultFiltered);
    } else {
      // Filter students by selected month
      const monthFiltered = allStudents.filter(student => {
        const expiryDate = new Date(student.frroExpiryDate);
        return expiryDate.getMonth() === selectedMonth.month && 
               expiryDate.getFullYear() === selectedMonth.year;
      });
      setFilteredStudents(monthFiltered);
    }
  }, [selectedMonth, allStudents]);

  const handleStatusChange = async (studentId, newStatus) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/students/${studentId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error("Failed to update status");

      setStudentStatus(prev => ({ ...prev, [studentId]: newStatus }));

      // Update both allStudents and filteredStudents
      setAllStudents(prev =>
        prev.map(s =>
          s._id === studentId ? { ...s, studentStatus: newStatus } : s
        )
      );
      
      setFilteredStudents(prev =>
        prev.map(s =>
          s._id === studentId ? { ...s, studentStatus: newStatus } : s
        )
      );

      // If applied for renewal, remove student from lists
      if (newStatus === "Applied for Renewal") {
        setAllStudents(prev => prev.filter(s => s._id !== studentId));
        setFilteredStudents(prev => prev.filter(s => s._id !== studentId));
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

  const getMonthsWithExpiry = () => {
    const monthsMap = new Map();
    const currentYear = new Date().getFullYear();
    
    allStudents.forEach(student => {
      if (student.frroExpiryDate) {
        const expiryDate = new Date(student.frroExpiryDate);
        const monthYear = {
          month: expiryDate.getMonth(),
          year: expiryDate.getFullYear(),
          name: expiryDate.toLocaleString('default', { month: 'long', year: 'numeric' })
        };
        const key = `${monthYear.month}-${monthYear.year}`;
        
        if (!monthsMap.has(key)) {
          monthsMap.set(key, monthYear);
        }
      }
    });
    
    return Array.from(monthsMap.values()).sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year;
      return a.month - b.month;
    });
  };

  const handleMonthSelect = (monthYear) => {
    setSelectedMonth(monthYear);
    setShowMonthFilter(false);
  };

  const clearMonthFilter = () => {
    setSelectedMonth(null);
  };

  const visibleStudents = filteredStudents.filter(
    s => studentStatus[s._id] !== "Applied for Renewal"
  );

  const monthsWithExpiry = getMonthsWithExpiry();

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>
        {selectedMonth 
          ? `Students with FRRO Expiry in ${selectedMonth.name}`
          : "Students with FRRO Expiry within 1 Month"}
      </h2>

      <div style={{ marginBottom: "20px", position: "relative" }}>
        <button 
          onClick={() => setShowMonthFilter(!showMonthFilter)}
          style={{
            padding: "8px 16px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          {selectedMonth ? `Filter: ${selectedMonth.name}` : "Filter by Month"}
        </button>
        
        {selectedMonth && (
          <button 
            onClick={clearMonthFilter}
            style={{
              marginLeft: "10px",
              padding: "8px 16px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Clear Filter
          </button>
        )}

        {showMonthFilter && (
          <div style={{
            position: "absolute",
            top: "100%",
            left: "0",
            backgroundColor: "white",
            border: "1px solid #ddd",
            borderRadius: "4px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            zIndex: "100",
            width: "200px",
            maxHeight: "300px",
            overflowY: "auto",
          }}>
            {monthsWithExpiry.length > 0 ? (
              monthsWithExpiry.map((monthYear) => (
                <div
                  key={`${monthYear.month}-${monthYear.year}`}
                  onClick={() => handleMonthSelect(monthYear)}
                  style={{
                    padding: "8px 16px",
                    cursor: "pointer",
                    backgroundColor: selectedMonth?.month === monthYear.month && 
                                   selectedMonth?.year === monthYear.year 
                                   ? "#e0e0e0" : "transparent",
                    ":hover": {
                      backgroundColor: "#f0f0f0",
                    },
                  }}
                >
                  {monthYear.name}
                </div>
              ))
            ) : (
              <div style={{ padding: "8px 16px", color: "#777" }}>
                No expiry months found
              </div>
            )}
          </div>
        )}
      </div>

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
          <p>No students found {selectedMonth ? `with expiry in ${selectedMonth.name}` : "with expiry within 1 month"}.</p>
        )}
      </div>
    </div>
  );
};

export default Home;