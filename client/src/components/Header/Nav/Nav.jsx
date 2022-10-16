import React from "react";
import { Link } from 'react-router-dom';
import "./Nav.css";

const Nav = () => {
  return (
    <nav className={"nav-bar"}>
      <Link to="/">Home</Link>
      <Link to="/landing">Asteroids</Link>
      <Link to="/landing/list">List</Link>
    </nav>
  )
};

export default Nav;
