import React from "react";
import "../../Style/homepage/CarBodyType.css";
import Car1 from "../../assets/CarByBodyType/Car1.jpg";
import Car2 from "../../assets/CarByBodyType/Car2.jpg";
import Car3 from "../../assets/CarByBodyType/Car3.jpg";
import Car4 from "../../assets/CarByBodyType/Car4.jpg";

const CarBodyType = () => {
  const cars = [
    {
      name: "Renault Kwid",
      price: "₹2.31 Lakh",
      img: Car1,
    },
    {
      name: "Maruti Suzuki Wagon R 1.0",
      price: "₹2.12 Lakh",
      img: Car2,
    },
    {
      name: "Maruti Suzuki Alto 800",
      price: "₹1.92 Lakh",
      img: Car3,
    },
    {
      name: "Maruti Suzuki Swift",
      price: "₹2.14 Lakh",
      img: Car4,
    },
  ];

  return (
    <div className="car-container">
      <h2 className="car-heading">Explore by Body Type</h2>
      <div className="body-type-tabs">
        <div className="tab active">Hatchback</div>
        <div className="tab">Sedan</div>
        <div className="tab">SUV</div>
        <div className="tab">MUV</div>
      </div>

      <div className="car-grid">
        {cars.map((car, index) => (
          <div className="car-card" key={index}>
            <img src={car.img} alt={car.name} className="car-image" />
            <div className="car-info">
              <h3>{car.name}</h3>
              <p className="car-price">
                {car.price} <span className="onwards">onwards</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <button className="view-all-btn">View all hatchbacks</button>
    </div>
  );
};

export default CarBodyType;
