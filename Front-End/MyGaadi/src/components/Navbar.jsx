import React from "react";
import { FaSearch, FaHeart, FaUserCircle } from "react-icons/fa";
import "../Style/Navbar.css";
import carLogo from "../assets/logo.png";

function Navbar() {
  return (
    <>
      <nav className="navbar">
        {/* Logo Section */}
        <div className="navbar-left">
          <img src={carLogo} alt="MyGaadi Logo" className="logo" />
          <div className="logo-text">
            <div className="tagline">BADHTE INDIA KA BHAROSA</div>
          </div>
        </div>

        {/* Search Section */}
        <div className="navbar-search">
          <select className="search-select">
            <option>All</option>
          </select>
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search or Ask a Question"
            className="search-input"
          />
        </div>

        {/* Right Side */}
        <div className="navbar-right">
          <FaHeart className="icon" />
          <div className="user-info">
            <div className="dropdown">
              <button className="dropbtn">Account ▼</button>
              <div className="dropdown-content">
                <a href="/">Login</a>
                <a href="/register">Register</a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
