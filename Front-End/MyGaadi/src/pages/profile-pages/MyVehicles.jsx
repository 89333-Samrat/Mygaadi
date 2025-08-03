import React, { useEffect, useState } from "react";
import axios from "axios";

const MyVehicles = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    console.log("Token:", token); // ✅ Check if token exists

    axios
      .get("http://localhost:8080/cars/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Fetched cars:", res.data); // ✅ Debug
        setCars(res.data);
      })
      .catch((err) => console.error("Error fetching your cars:", err));
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="mb-4">My Listed Vehicles</h3>
      {cars.length === 0 ? (
        <p>No vehicles listed yet.</p>
      ) : (
        <div className="row g-3">
          {cars.map((car) => (
            <div key={car.carId} className="col-md-4">
              <div className="card">
                {car.images.length > 0 && (
                  <img
                    src={`data:image/jpeg;base64,${car.images[0].imagebase64}`}
                    className="card-img-top"
                    alt="Car"
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">
                    {car.brand} {car.model}
                  </h5>
                  <p className="card-text">
                    ₹{car.price?.toLocaleString()} <br />
                    {car.registrationYear} • {car.kmDriven} km
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyVehicles;
