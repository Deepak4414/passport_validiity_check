import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AddStudentDetails from "./components/AddStudentDetails";
import UpdateStudent from "./components/UpdateSudent";
import Navbar from "./components/Navbar";
import ShowStudent from "./components/ShowStudent";
import axios from "axios";
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AddStudentDetails />} />
        <Route path="/contact" element={<UpdateStudent />} />
        <Route path="/all-student" element={<ShowStudent/>} />
      </Routes>
    </Router>
  );
};

export default App;
