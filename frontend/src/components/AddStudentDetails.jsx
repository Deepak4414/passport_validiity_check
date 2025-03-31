import React, { useState } from "react";
import "./AddStudent.css";

const AddStudentDetails = () => {
  const [student, setStudent] = useState({
    name: "",
    age: "",
    country: "",
    passportNumber: "",
  });

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/students/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
      });

      if (response.ok) {
        alert("Student added successfully!");
        setStudent({ name: "", age: "", country: "", passportNumber: "" });
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error connecting to server!");
    }
  };

  return (
    <div className="container">
      <h2 className="title">Add Student Details</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label className="label" htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={student.name}
            onChange={handleChange}
            required
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="age">Age:</label>
          <input
            type="number"
            name="age"
            value={student.age}
            onChange={handleChange}
            required
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="country">Country:</label>
          <input
            type="text"
            name="country"
            value={student.country}
            onChange={handleChange}
            required
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="passportNumber">Passport Number:</label>
          <input
            type="text"
            name="passportNumber"
            value={student.passportNumber}
            onChange={handleChange}
            required
            className="input"
          />
        </div>
        <button type="submit" className="submit-button">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudentDetails;