import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MyVehicles = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    console.log("Token:", token);

    axios
      .get("http://localhost:8080/cars/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Fetched cars:", res.data);
        setCars(res.data);
      })
      .catch((err) => console.error("Error fetching your cars:", err));
  }, []);

  const deleteCar = (carId) => {
    axios
      .delete(`http://localhost:8080/cars/${carId}`)
      .then(() => {
        toast.success("Car was removed successfully");
        setCars((prevCars) => prevCars.filter((car) => car.carId !== carId));
      })
      .catch((ex) => {
        console.error("Error deleting car:", ex);
        toast.error("Failed to delete the car");
      });
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">My Listed Vehicles</h3>
      {cars.length === 0 ? (
        <p>No vehicles listed yet.</p>
      ) : (
        <div className="row g-3">
          {cars.map((car) => (
            <div key={car.carId} className="col-md-4">
              <div className="card h-100">
                {car.images.length > 0 && (
                  <img
                    src={`data:image/jpeg;base64,${car.images[0].imagebase64}`}
                    className="card-img-top"
                    alt="Car"
                    style={{
                      height: "200px", // Set fixed height
                      objectFit: "cover", // Crop the image
                      width: "100%", // Full width
                      borderTopLeftRadius: "calc(0.25rem - 1px)",
                      borderTopRightRadius: "calc(0.25rem - 1px)",
                    }}
                  />
                )}
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title">
                      {car.brand} {car.model}
                    </h5>
                    <p className="card-text">
                      ₹{car.price?.toLocaleString()} <br />
                      {car.registrationYear} • {car.kmDriven} km
                    </p>
                  </div>
                  <div
                    className="mt-3"
                    style={{ display: "flex", gap: "10px" }}
                  >
                    <button
                      className="btn btn-primary w-50"
                      onClick={() => {
                        if (car.carId) {
                          navigate(`/home/updatecar/${car.carId}`);
                        } else {
                          toast.error("Car ID is missing");
                        }
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger w-50"
                      onClick={() => deleteCar(car.carId)}
                    >
                      Delete
                    </button>
                  </div>
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
