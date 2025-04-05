import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import "./StudentList.css";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/students`);
        setStudents(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="container">
      <h2>Student List</h2>
      <table>
        <thead>
          <tr>
            <th>VU ID</th>
            <th>Name</th>
            <th>Course</th>
            <th>Batch</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.vuId}</td>
              <td>{student.name}</td>
              <td>{student.course}</td>
              <td>{student.batchOfStudying}</td>
              <td>
                <Link to={`/update-student/${student._id}`}>
                  <button className="edit-btn">Edit</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
