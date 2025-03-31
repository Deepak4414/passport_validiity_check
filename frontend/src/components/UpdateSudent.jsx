import React, { useState } from 'react';

const UpdateStudent = () => {
    const [student, setStudent] = useState({
        name: '',
        age: '',
        email: '',
        passportNumber: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent((prevStudent) => ({
            ...prevStudent,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic to update student details (e.g., API call)
        console.log('Updated Student:', student);
    };

    return (
        <div>
            <h2>Update Student</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={student.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Age:</label>
                    <input
                        type="number"
                        name="age"
                        value={student.age}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={student.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Passport Number:</label>
                    <input
                        type="text"
                        name="passportNumber"
                        value={student.passportNumber}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default UpdateStudent;