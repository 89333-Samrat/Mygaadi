import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../Style/carFilter.css"; // import external CSS

const AllCarsPage = () => {
  const [cars, setCars] = useState([]);
  const [startIndex, setStartIndex] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/cars/all")
      .then((res) => setCars(res.data))
      .catch((err) => console.error("Error fetching cars:", err));
  }, []);

  const handleClick = (carId) => {
    navigate(`/Home/cars/${carId}`);
  };

  const handleNext = () => {
    if (startIndex < cars.length - 1) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const visibleCars = cars.slice(startIndex - 1, startIndex + 2);

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

export default AllCarsPage;
