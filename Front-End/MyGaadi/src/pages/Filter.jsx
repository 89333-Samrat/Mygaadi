import React from "react";
import "../Style/Filter.css";

const Filter = () => {
  return (
    <aside className="filter-sidebar">
      <div className="filter-section">
        <h4>Budget</h4>
        <input type="range" min="0" max="6000000" className="range-slider" />
        <div className="checkbox-group">
          {[
            "Under ₹2 Lakh",
            "₹2 - ₹3 Lakh",
            "₹3 - ₹5 Lakh",
            "₹5 - ₹8 Lakh",
            "₹8 - ₹10 Lakh",
            "Above ₹10 Lakh",
          ].map((range, index) => (
            <label key={index}>
              <input type="checkbox" /> {range}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h4>Brand + Model</h4>
        <input
          type="text"
          placeholder="Search Brand or Model"
          className="search-input"
        />
        <div className="checkbox-group">
          {[
            "Maruti",
            "Hyundai",
            "Honda",
            "Tata",
            "Mahindra",
            "Toyota",
            "Mercedes-Benz",
            "BMW",
            "Audi",
            "Volvo",
          ].map((brand, index) => (
            <label key={index}>
              <input type="checkbox" /> {brand}
            </label>
          ))}
        </div>
        <a className="show-more">Show More Brands</a>
      </div>

      <div className="filter-section">
        <h4>Model Year</h4>
        <input type="range" min="2000" max="2025" className="range-slider" />
      </div>

      <div className="filter-section">
        <h4>Kilometer Driven</h4>
        <input type="range" min="0" max="200000" className="range-slider" />
      </div>

      <div className="filter-section">
        <h4>Fuel Type</h4>
        {["Petrol", "Diesel", "CNG", "Electric"].map((fuel, index) => (
          <label key={index}>
            <input type="checkbox" /> {fuel}
          </label>
        ))}
      </div>

      <div className="filter-section">
        <h4>Body Type</h4>
        {["Hatchback", "SUV", "Sedan", "MUV", "Minivan", "Convertible"].map(
          (type, index) => (
            <label key={index}>
              <input type="checkbox" /> {type}
            </label>
          )
        )}
      </div>

      <div className="filter-section">
        <h4>Transmission</h4>
        {["Manual", "Automatic"].map((trans, index) => (
          <label key={index}>
            <input type="checkbox" /> {trans}
          </label>
        ))}
      </div>

      <div className="filter-section">
        <h4>Ownership</h4>
        {["First owner", "Second owner", "Third owner or more"].map(
          (own, index) => (
            <label key={index}>
              <input type="checkbox" /> {own}
            </label>
          )
        )}
      </div>
    </aside>
  );
};

export default Filter;
