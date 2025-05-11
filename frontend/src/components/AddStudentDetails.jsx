import React, { useState } from "react";
import axios from "axios";
import "./AddStudent.css";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AddStudentDetails = () => {
  const [student, setStudent] = useState({
    vuId: "",
    registrationNumber: "",
    name: "",
    dob: "",
    gender: "",
    country: "",
    course: "",
    branch: "",
    batchOfStudying: "",
    mobileNumber: "",
    passportNumber: "",
    passportIssueDate: "",
    passportExpiryDate: "",
    frroIssueDate: "",
    frroExpiryDate: "",
    dateOfReporting: "",
    addressMode: "",
    currentAddress: ""
  });

  const [studentImage, setStudentImage] = useState(null);
  const [passportImage, setPassportImage] = useState(null);
  const [frroImage, setFrroImage] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateFile = (file, fieldName) => {
    const newErrors = { ...errors };
    
    if (!file) {
      newErrors[fieldName] = "";
      setErrors(newErrors);
      return false;
    }

    // Check file type
    if (!file.type.match(/image\/(jpeg|jpg|png)/)) {
      newErrors[fieldName] = "Only JPG, JPEG, or PNG files are allowed";
      setErrors(newErrors);
      return false;
    }

    // Check file size (300KB limit)
    if (file.size > 300 * 1024) {
      newErrors[fieldName] = "File size exceeds 300KB limit";
      setErrors(newErrors);
      return false;
    }

    // Clear any previous error
    newErrors[fieldName] = "";
    setErrors(newErrors);
    return true;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const fieldName = e.target.name;

    if (!file) {
      // Clear the image state if no file selected
      if (fieldName === "studentImage") setStudentImage(null);
      if (fieldName === "passportImage") setPassportImage(null);
      if (fieldName === "frroImage") setFrroImage(null);
      return;
    }

    if (validateFile(file, fieldName)) {
      // Update the appropriate image state
      if (fieldName === "studentImage") setStudentImage(file);
      if (fieldName === "passportImage") setPassportImage(file);
      if (fieldName === "frroImage") setFrroImage(file);
    } else {
      e.target.value = ""; // Clear the file input
      // Clear the image state
      if (fieldName === "studentImage") setStudentImage(null);
      if (fieldName === "passportImage") setPassportImage(null);
      if (fieldName === "frroImage") setFrroImage(null);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate only VU ID is required
    if (!student.vuId) {
      newErrors.vuId = "VU ID is required";
    }

    // Validate mobile number format if provided
    if (student.mobileNumber && !/^\d{10,15}$/.test(student.mobileNumber)) {
      newErrors.mobileNumber = "Enter a valid mobile number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const formData = new FormData();

    // Append only fields that have values
    Object.keys(student).forEach((key) => {
      if (student[key]) {
        formData.append(key, student[key]);
      }
    });

    if (studentImage) formData.append("studentImage", studentImage);
    if (passportImage) formData.append("passportImage", passportImage);
    if (frroImage) formData.append("frroImage", frroImage);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/students/add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        alert("Student added successfully!");
        // Reset form
        setStudent({
          vuId: "",
          registrationNumber: "",
          name: "",
          dob: "",
          gender: "",
          country: "",
          course: "",
          branch: "",
          batchOfStudying: "",
          mobileNumber: "",
          passportNumber: "",
          passportIssueDate: "",
          passportExpiryDate: "",
          frroIssueDate: "",
          frroExpiryDate: "",
          dateOfReporting: "",
          addressMode: "",
          currentAddress: ""
        });
        setStudentImage(null);
        setPassportImage(null);
        setFrroImage(null);
        setErrors({});
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response?.data?.error) {
        // Handle server-side errors
        setErrors({ ...errors, form: error.response.data.error });
      } else {
        setErrors({ ...errors, form: "Failed to add student" });
      }
    }
  };

  const ErrorMessage = ({ error }) => (
    error ? <div className="error-message">{error}</div> : null
  );

  return (
    <div className="container">
      <h2 className="title">Add Student Details</h2>
      
      {errors.form && <div className="form-error-message">{errors.form}</div>}

      <form onSubmit={handleSubmit} className="form" encType="multipart/form-data">
        <fieldset>
          <legend>Student Information</legend>
          <div className="vertical-layout">
            <span>
              <label>VU ID: <span className="required">*</span></label>
              <input 
                type="text" 
                name="vuId" 
                value={student.vuId} 
                onChange={handleChange} 
                placeholder="VU ID" 
                className={errors.vuId ? "error-input" : ""}
              />
              <ErrorMessage error={errors.vuId} />
            </span>
            <span>
              <label>Registration Number:</label>
              <input 
                type="text" 
                name="registrationNumber" 
                value={student.registrationNumber} 
                onChange={handleChange} 
                placeholder="Registration Number"  
              />
            </span>
          </div>
          <div className="vertical-layout">
            <span>
              <label>Name:</label>
              <input 
                type="text" 
                name="name" 
                value={student.name} 
                onChange={handleChange} 
                placeholder="Name"  
              />
            </span>
            
          </div>
          <div className="horizontal-layout">
            <span>
              <label>Gender:</label>
              <select 
                name="gender" 
                value={student.gender} 
                onChange={handleChange}
                className={errors.gender ? "error-input" : ""}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <ErrorMessage error={errors.gender} />
            </span>
            <span>
              <label>Date of Birth:</label>
              <input 
                type="date" 
                name="dob" 
                value={student.dob} 
                onChange={handleChange}  
              />
            </span>
            <span>
              <label>Country:</label>
              <input 
                type="text" 
                name="country" 
                value={student.country} 
                onChange={handleChange} 
                placeholder="Country"  
              />
            </span>
          </div>
         <div className="horizontal-layout">
            <span>
              <label>Current Address Mode:</label>
              <select 
                name="addressMode" 
                value={student.addressMode} 
                onChange={handleChange}
                className={errors.addressMode ? "error-input" : ""}
              >
                <option value="">Select</option>
                <option value="hostler">Hostler</option>
                <option value="dayscholar">Dayscholar</option>
              </select>
              <ErrorMessage error={errors.addressMode} />
            </span>
            <span>
              <label>Current Address:</label>
              <input 
                type="text" 
                name="currentAddress" 
                value={student.currentAddress} 
                onChange={handleChange} 
                placeholder="Enter current address"  
              />
            </span>
          </div>
        </fieldset>

        <fieldset>
          <legend>Contact Information</legend>
          <div className="vertical-layout">
            <span>
              <label>Course:</label>
              <input 
                type="text" 
                name="course" 
                value={student.course} 
                onChange={handleChange} 
                placeholder="Course [B-tech,M-tech,...]"  
              />
            </span>
            <span>
              <label>Branch:</label>
              <input 
                type="text" 
                name="branch" 
                value={student.branch} 
                onChange={handleChange} 
                placeholder="Branch [Cse,Ece,...]"  
              />
            </span>
          </div>
          <div className="horizontal-layout">
            <span>
              <label>Batch of Studying:</label>
              <input 
                type="text" 
                name="batchOfStudying" 
                value={student.batchOfStudying} 
                onChange={handleChange} 
                placeholder="Example [2025-2029]"  
              />
            </span>
            <span>
              <label>Mobile Number:</label>
              <input 
                type="tel" 
                name="mobileNumber" 
                value={student.mobileNumber} 
                onChange={handleChange} 
                placeholder="Mobile Number"  
                className={errors.mobileNumber ? "error-input" : ""}
              />
              <ErrorMessage error={errors.mobileNumber} />
            </span>
          </div>
        </fieldset>

        <fieldset>
          <legend>Student Image (Max 300KB)</legend>
          <div className="vertical-layout">
            <span>
              <label>Student Image:</label>
              <input 
                type="file" 
                name="studentImage" 
                onChange={handleFileChange} 
                accept="image/jpeg, image/jpg, image/png"
                className={errors.studentImage ? "error-input" : ""}
              />
              <ErrorMessage error={errors.studentImage} />
              {studentImage && (
                <div className="file-info">
                  Selected: {studentImage.name} ({(studentImage.size / 1024).toFixed(2)} KB)
                </div>
              )}
            </span>
          </div>
        </fieldset>

        <fieldset>
          <legend>Passport Information</legend>
          <div className="horizontal-layout">
            <span>
              <label>Passport Number:</label>
              <input 
                type="text" 
                name="passportNumber" 
                value={student.passportNumber} 
                onChange={handleChange} 
                placeholder="Passport Number"  
              />
            </span>
            <span>
              <label>Passport Image (Max 300KB):</label>
              <input 
                type="file" 
                name="passportImage" 
                onChange={handleFileChange} 
                accept="image/jpeg, image/jpg, image/png"
                className={errors.passportImage ? "error-input" : ""}
              />
              <ErrorMessage error={errors.passportImage} />
              {passportImage && (
                <div className="file-info">
                  Selected: {passportImage.name} ({(passportImage.size / 1024).toFixed(2)} KB)
                </div>
              )}
            </span>
           
          </div>
          <div className="horizontal-layout">
             <span>
              <label>Passport Issue Date:</label>
              <input 
                type="date" 
                name="passportIssueDate" 
                value={student.passportIssueDate} 
                onChange={handleChange}  
              />
            </span>
            <span>
              <label>Passport Expiry Date:</label>
              <input 
                type="date" 
                name="passportExpiryDate" 
                value={student.passportExpiryDate} 
                onChange={handleChange}  
              />
            </span>
            
          </div>
        </fieldset>
          <fieldset>
          <legend>FRRO Information</legend>
          <div className="horizontal-layout">
            <span>
              <label>FRRO Issue Date:</label>
              <input 
                type="date" 
                name="frroIssueDate" 
                value={student.frroIssueDate} 
                onChange={handleChange}  
              />
            </span>
            <span>
              <label>FRRO Expiry Date:</label>
              <input 
                type="date" 
                name="frroExpiryDate" 
                value={student.frroExpiryDate} 
                onChange={handleChange}  
              />
            </span>
          </div>
          <div className="horizontal-layout">
            <span>
              <label>FRRO Image (Max 300KB):</label>
              <input 
                type="file" 
                name="frroImage" 
                onChange={handleFileChange} 
                accept="image/jpeg, image/jpg, image/png"
                className={errors.frroImage ? "error-input" : ""}
              />
              <ErrorMessage error={errors.frroImage} />
              {frroImage && (
                <div className="file-info">
                  Selected: {frroImage.name} ({(frroImage.size / 1024).toFixed(2)} KB)
                </div>
              )}
            </span>
          </div>
        </fieldset>

      

        <button type="submit" className="submit-button">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudentDetails;