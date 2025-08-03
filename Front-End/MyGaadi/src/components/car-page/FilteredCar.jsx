import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../../Style/Filter.css";
const FilterCar = () => {
  const location = useLocation();
  const [startIndex, setStartIndex] = useState(1);
  const { brand, city } = location.state || {};
  const [cars, setCars] = useState([]);
  if (city != null) {
    console.log(city.name);
  }
  const handleNext = () => {
    if (startIndex < cars.length - 1) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 1) {
      setStartIndex(startIndex - 1);
    }
  };

  const visibleCars = cars.slice(startIndex - 1, startIndex + 2);

  const navigate = useNavigate();

  const body = {
    location: city?.name ?? null,
    brand: brand?.name ?? null,
  };
  useEffect(() => {
    axios
      .post(`http://localhost:8080/cars/filter`, body) // your backend endpoint
      .then((res) => {
        console.log("RAW API RESPONSE:", res.data);
        setCars(res.data);
      })
      .catch((err) => {
        console.error("Error fetching cars:", err);
      });
  }, []);

  const handleClick = (carId) => {
    navigate(`/Home/cars/${carId}`);
  };

  return (
    <div className="carousel-container">
      <button
        onClick={handlePrev}
        disabled={startIndex <= 1}
        className="nav-btn"
      >
        ←
      </button>

      {visibleCars.map((car, idx) => {
        const isCenter = idx === 1;

        return (
          <div
            key={car.carId}
            className={`car-card ${isCenter ? "center-card" : "side-card"}`}
            onClick={() => handleClick(car.carId)}
          >
            {car.images?.length > 0 ? (
              <img
                src={`data:image/jpeg;base64,${car.images[0].imagebase64}`}
                alt={`${car.brand} ${car.model}`}
                className="car-image"
              />
            ) : (
              <div className="no-image">No Image</div>
            )}

            <div className="car-info">
              <h3>
                {car.brand} {car.model}
              </h3>
              <p>₹{car.price?.toLocaleString()} *</p>
              <p>
                {car.registrationYear} • {car.fuelType} • {car.transmission}
              </p>
              <p>
                {car.kmDriven} km • {car.ownership} Owner
              </p>

              <div className="tags">
                {car.fuelType === "Electric" && (
                  <span className="tag green">⚡ Electric</span>
                )}
                {car.insuranceValid && (
                  <span className="tag blue">🛡 Insurance Valid</span>
                )}
              </div>

              <button
                className="offer-button"
                onClick={(e) => {
                  e.stopPropagation();
                  alert("View August Offers");
                }}
              >
                View August Offers
              </button>
            </div>

            <div className="variant-bar">Variant: {car.variant}</div>
          </div>
        );
      })}

      <button
        onClick={handleNext}
        disabled={startIndex >= cars.length - 1}
        className="nav-btn"
      >
        →
      </button>
    </div>
  );
};
export default FilterCar;
