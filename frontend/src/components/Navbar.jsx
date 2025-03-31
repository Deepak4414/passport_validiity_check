import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <NavLink to="/" style={styles.link} activeStyle={styles.active}>Home</NavLink>
      <NavLink to="/about" style={styles.link} activeStyle={styles.active}>About</NavLink>
      <NavLink to="/contact" style={styles.link} activeStyle={styles.active}>Contact</NavLink>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    gap: "20px",
    padding: "10px",
    backgroundColor: "#333",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
  },
  active: {
    fontWeight: "bold",
    textDecoration: "underline",
  }
};

export default Navbar;
