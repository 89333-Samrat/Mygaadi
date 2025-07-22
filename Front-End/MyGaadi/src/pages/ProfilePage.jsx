import React from "react";
import "../Style/ProfilePage.css";

const ProfilePage = () => {
  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-icon">S</div>
          <div className="profile-details">
            <h2>Samrat Mali</h2>
            <p>9022605088</p>
            <a href="#">Link your email or social account</a>
          </div>
        </div>

        <div className="profile-options">
          <button>My Orders</button>
          <button>Shortlisted Vehicles</button>
          <button>My Activity</button>
          <button>My Vehicles</button>
          <button>My Garage</button>
          <button>Manage Consents</button>
          <button>Profile Settings</button>
        </div>

        <button className="logout-button">Logout</button>
      </div>
    </div>
  );
};

export default ProfilePage;
