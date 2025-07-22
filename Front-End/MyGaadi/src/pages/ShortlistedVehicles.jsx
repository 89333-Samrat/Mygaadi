import React from "react";
import "../Style/ShortlistedVehicles.css";

const vehicles = [
  {
    name: "Tata Safari",
    price: "₹15.50 - 27.25 Lakh*",
    type: "Diesel · Manual/Automatic",
    tag: "NEW CAR",
  },
  {
    name: "Tata Harrier",
    price: "₹15 - 26.50 Lakh*",
    type: "Diesel · Manual/Automatic",
    tag: "NEW CAR",
  },
  {
    name: "Tata Tiago",
    price: "₹5 - 8.45 Lakh*",
    type: "Petrol / CNG · Manual/Automatic",
    tag: "NEW CAR",
  },
  {
    name: "Tata Curvv",
    price: "₹10 - 19.52 Lakh*",
    type: "Diesel / Petrol · Manual/Automatic",
    tag: "NEW CAR",
  },
];

const ShortlistedVehicles = () => {
  return (
    <div className="shortlist-container">
      <aside className="sidebar">
        <div className="profile-section">
          <div className="avatar">S</div>
          <div className="user-info">
            <p className="name">Samrat Mali</p>
            <p className="phone">9022605088</p>
            <a href="#">Link your e-mail or social account</a>
          </div>
        </div>
        <nav className="nav-menu">
          <button>My Orders</button>
          <button className="active">Shortlisted Vehicles</button>
          <button>My Activity</button>
          <button>My Vehicles</button>
          <button>My Garage</button>
          <button>Manage Consents</button>
          <button>Profile Settings</button>
        </nav>
        <button className="logout-btn">Logout</button>
      </aside>

      <main className="main-content">
        <h2>Shortlisted</h2>
        <p>13 items are shortlisted, you can explore them</p>
        <div className="filter-buttons">
          <button className="active">All</button>
          <button>New Car</button>
          <button>Used Car</button>
        </div>
        <div className="vehicle-list">
          {vehicles.map((v, index) => (
            <div className="vehicle-card" key={index}>
              <div className="vehicle-tag">{v.tag}</div>
              <h3>{v.name}</h3>
              <p>{v.type}</p>
              <p className="price">{v.price}</p>
              <button className="check-now">Check Now ➤</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ShortlistedVehicles;
