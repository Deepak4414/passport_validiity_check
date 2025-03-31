import React, { useState } from 'react';

const AddStudentDetails = () => {
    const [student, setStudent] = useState({
        name: '',
        age: '',
        country: '',
        passportNumber: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent({ ...student, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Student Details:', student);
        // Add logic to save student details
        setStudent({ name: '', age: '', country: '', passportNumber: '' });
    };

    return (
        <div>
            <h2>Add Student Details</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={student.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Age:</label>
                    <input
                        type="number"
                        name="age"
                        value={student.age}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Country:</label>
                    <input
                        type="text"
                        name="country"
                        value={student.country}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Passport Number:</label>
                    <input
                        type="text"
                        name="passportNumber"
                        value={student.passportNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Add Student</button>
            </form>
        </div>
    );
};

export default AddStudentDetails;