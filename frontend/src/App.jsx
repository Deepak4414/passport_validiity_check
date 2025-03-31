import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AddStudentDetails from "./components/AddStudentDetails";
import UpdateStudent from "./components/UpdateSudent";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AddStudentDetails />} />
        <Route path="/contact" element={<UpdateStudent />} />
      </Routes>
    </Router>
  );
};

export default App;
