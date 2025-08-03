import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../Style/CarDetails.css";
const CarDetailPage = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [wishlist, setWishlist] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/cars/${carId}`)
      .then((res) => {
        setCar(res.data);
      })
      .catch((err) => console.error(err));
  }, [carId]);

  const toggleWishlist = () => {
    setWishlist((prev) => !prev);

    axios
      .post(`http://localhost:8080/api/favorites/3/${carId}`)
      .then((res) => {
        if (res.status === 200) {
          alert("Car was added to wishlist");
        } else {
          console.warn("Unexpected response status:", res.status);
        }
      })
      .catch((err) => {
        console.error("Error adding to wishlist:", err);
      });
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % car.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + car.images.length) % car.images.length
    );
  };

  if (!car) return <div className="text-center mt-5 fs-4">Loading...</div>;

  return (
    <div className="container mt-5 car-detail-container">
      <div className="row g-4">
        {/* Image section */}
        <div className="col-md-5">
          <div className="image-wrapper position-relative">
            <img
              src={`data:image/jpeg;base64,${car.images[currentImageIndex]?.imagebase64}`}
              alt="Car"
              className="car-image w-100 rounded"
            />

            {car.images.length > 1 && (
              <>
                <button
                  className="image-nav-button left btn btn-light rounded-circle"
                  onClick={prevImage}
                >
                  <i className="bi bi-chevron-left fs-4" />
                </button>
                <button
                  className="image-nav-button right btn btn-light rounded-circle"
                  onClick={nextImage}
                >
                  <i className="bi bi-chevron-right fs-4" />
                </button>
              </>
            )}
          </div>

          <div className="d-flex justify-content-between align-items-start mt-4">
            <h5>Description</h5>
            <button className="btn btn-link p-0" onClick={toggleWishlist}>
              <i
                className={`bi ${
                  wishlist ? "bi-heart-fill text-danger" : "bi-heart text-muted"
                } fs-3`}
              />
            </button>
          </div>
          <p>{car.description}</p>

          <div className="d-flex gap-3 mt-3 flex-wrap">
            <button className="btn btn-primary">
              <i className="bi bi-calendar-check me-2"></i>Book Car
            </button>
            <button className="btn btn-success">
              <i className="bi bi-telephone me-2"></i>Contact Dealer
            </button>
            <button className="btn btn-secondary" onClick={() => navigate(-1)}>
              <i className="bi bi-arrow-left me-2"></i>Go Back
            </button>
          </div>
        </div>

        {/* Car details table */}
        <div className="col-md-7">
          <h4>
            {car.brand} {car.model} - {car.variant}
          </h4>
          <table className="table table-bordered table-sm mt-3 fs-5">
            <tbody>
              <tr>
                <th>Registration Year</th>
                <td>{car.registrationYear}</td>
              </tr>
              <tr>
                <th>Ownership</th>
                <td>{car.ownership}</td>
              </tr>
              <tr>
                <th>KM Driven</th>
                <td>{car.kmDriven} km</td>
              </tr>
              <tr>
                <th>Location</th>
                <td>{car.location}</td>
              </tr>
              <tr>
                <th>Registration No.</th>
                <td>{car.registrationNumber}</td>
              </tr>
              <tr>
                <th>Color</th>
                <td>{car.color}</td>
              </tr>
              <tr>
                <th>Insurance Valid</th>
                <td>{car.insuranceValid ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <th>Fuel Type</th>
                <td>{car.fuelType}</td>
              </tr>
              <tr>
                <th>Transmission</th>
                <td>{car.transmission}</td>
              </tr>
              <tr>
                <th>Price</th>
                <td>₹{car.price?.toLocaleString()}</td>
              </tr>
              <tr>
                <th>Listed On</th>
                <td>{new Date(car.createdAt).toLocaleDateString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage;
