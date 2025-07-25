import React from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth.context";

import { FaSearch, FaHeart, FaUserCircle } from "react-icons/fa";
import "../Style/Navbar.css";
import carLogo from "../assets/logo.png";

function Navbar() {
  //get the navigate() function reference
  const navigate = useNavigate();

  //get setUser from AuthContext
  const { setUser } = useContext(AuthContext);

  const onLogout = () => {
    //remove all the caches values from session Storage
    sessionStorage.removeItem("Name");
    sessionStorage.removeItem("token");

    //reset the user details in AuthContext
    setUser(null);

    //navigate to Login Screen

    navigate("/");
  };
  return (
    <>
      <nav className="navbar">
        {/* Logo Section */}

        <div className="navbar-left">
          <button id="logo" onClick={() => navigate("/home")}>
            <img src={carLogo} alt="MyGaadi Logo" className="logo" />
          </button>

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
          <button onClick={onLogout} className="logout-btn">
            Logout
          </button>
          <FaHeart
            className="wishlist-icon"
            onClick={() => navigate("/home/WishList")}
            style={{
              cursor: "pointer",
              fontSize: "28px",
              color: "#ff5858",
              marginRight: "16px",
            }}
          />
          <div className="profile-icon-container">
            <FaUserCircle
              className="profile-icon"
              onClick={() => navigate("/home/Profile")}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
