import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "./ShowStudent.css"; // Create this CSS file for additional styles

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ShowStudent = () => {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    addressMode: null,
    country: null,
    course: null,
    year: null,
    branch: null
  });
  const [showFilters, setShowFilters] = useState(false);

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

  // Extract unique values for filters
  const uniqueValues = {
    addressMode: [...new Set(students.map(s => s.addressMode))].filter(Boolean),
    country: [...new Set(students.map(s => s.country))].filter(Boolean),
    course: [...new Set(students.map(s => s.course))].filter(Boolean),
    year: [...new Set(students.map(s => s.batchOfStudying))].filter(Boolean),
    branch: [...new Set(students.map(s => s.branch))].filter(Boolean)
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType] === value ? null : value
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      addressMode: null,
      country: null,
      course: null,
      year: null,
      branch: null
    });
  };

  const filteredStudents = students.filter((student) => {
    // Search filter
    const matchesSearch = 
      student.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.name.toLowerCase().includes(searchQuery.toLowerCase());

    // Check all active filters
    const matchesFilters = (
      (!filters.addressMode || student.addressMode === filters.addressMode) &&
      (!filters.country || student.country === filters.country) &&
      (!filters.course || student.course === filters.course) &&
      (!filters.year || student.batchOfStudying === filters.year) &&
      (!filters.branch || student.branch === filters.branch)
    );

    return matchesSearch && matchesFilters;
  });

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredStudents);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(data, "students_data.xlsx");
  };

  return (
    <div className="student-list-container">
      {/* Header with search and actions */}
      <div className="list-header">
        <h2>Student Details</h2>
        <div className="action-buttons">
          <button 
            className="filter-toggle-btn"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
          <button 
            className="export-btn"
            onClick={exportToExcel}
          >
            Export to Excel
          </button>
        </div>
      </div>

      {/* Search bar */}
      <div className="search-bar">
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by Name or Registration Number"
        />
      </div>

      {/* Main content area */}
      <div className="content-area">
        {/* Filters sidebar */}
        { (
          <div className="filters-sidebar">
            <div className="filters-header">
              <h3>Filters</h3>
              <button 
                className="clear-filters-btn"
                onClick={clearAllFilters}
              >
                Clear All
              </button>
            </div>

            {/* Residence Type Filter */}
            <div className="filter-section">
              <h4 className="filter-title">Residence Type</h4>
              <div className="filter-options">
                {uniqueValues.addressMode.map(mode => (
                  <div 
                    key={mode}
                    className={`filter-option ${filters.addressMode === mode ? 'active' : ''}`}
                    onClick={() => handleFilterChange("addressMode", mode)}
                  >
                    {mode}
                  </div>
                ))}
              </div>
            </div>

            {/* Country Filter */}
            <div className="filter-section">
              <h4 className="filter-title">Country</h4>
              <div className="filter-options">
                {uniqueValues.country.map(country => (
                  <div 
                    key={country}
                    className={`filter-option ${filters.country === country ? 'active' : ''}`}
                    onClick={() => handleFilterChange("country", country)}
                  >
                    {country}
                  </div>
                ))}
              </div>
            </div>

            {/* Course Filter */}
            <div className="filter-section">
              <h4 className="filter-title">Course</h4>
              <div className="filter-options">
                {uniqueValues.course.map(course => (
                  <div 
                    key={course}
                    className={`filter-option ${filters.course === course ? 'active' : ''}`}
                    onClick={() => handleFilterChange("course", course)}
                  >
                    {course}
                  </div>
                ))}
              </div>
            </div>

            {/* Year Filter */}
            <div className="filter-section">
              <h4 className="filter-title">Batch Year</h4>
              <div className="filter-options">
                {uniqueValues.year.map(year => (
                  <div 
                    key={year}
                    className={`filter-option ${filters.year === year ? 'active' : ''}`}
                    onClick={() => handleFilterChange("year", year)}
                  >
                    {year}
                  </div>
                ))}
              </div>
            </div>

            {/* Branch Filter */}
            <div className="filter-section">
              <h4 className="filter-title">Branch</h4>
              <div className="filter-options">
                {uniqueValues.branch.map(branch => (
                  <div 
                    key={branch}
                    className={`filter-option ${filters.branch === branch ? 'active' : ''}`}
                    onClick={() => handleFilterChange("branch", branch)}
                  >
                    {branch}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Students List */}
        <div className="students-grid">
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <Link
                to={`/student/${student._id}`}
                key={student._id}
                className="student-card-link"
              >
                <div className="student-card">
                  <div className="student-image">
                    {student.studentImage ? (
                      <img
                        src={`${student.studentImage}`}
                        alt="Student"
                      />
                    ) : (
                      <div className="no-image-placeholder">
                        <span>No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="student-details">
                    <h3>{student.name}</h3>
                    <p><strong>ID:</strong> {student.registrationNumber}</p>
                    <p><strong>Passport Number: </strong> {student.passportNumber}</p>
                    <p><strong>Frro Expiry: </strong>{new Date(student.frroExpiryDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="no-results">
              <p>No students found matching your criteria.</p>
              <button onClick={clearAllFilters}>Clear all filters</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowStudent;