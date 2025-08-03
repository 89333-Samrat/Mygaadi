import React, { useState } from "react";
import "../../Style/AddCarForm.css";

const AddCarForm = () => {
  const [formValues, setFormValues] = useState({
    brand: "",
    model: "",
    registrationYear: "",
    ownership: "",
    kmDriven: "",
    location: "",
    registrationNo: "",
    color: "",
    insuranceValid: false,
    fuelType: "",
    transmission: "",
    price: "",
  });

  const [selectedImages, setSelectedImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);
    setPreviewUrls(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("car", JSON.stringify(formValues));
    selectedImages.forEach((file) => formData.append("images", file));

    const token = sessionStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:8080/cars/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        alert("Car added successfully!");
        setFormValues({
          brand: "",
          model: "",
          registrationYear: "",
          ownership: "",
          kmDriven: "",
          location: "",
          registrationNo: "",
          color: "",
          insuranceValid: false,
          fuelType: "",
          transmission: "",
          price: "",
        });
        setSelectedImages([]);
        setPreviewUrls([]);
      } else {
        const errorData = await response.json();
        alert("Failed to add car: " + errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong while uploading the car.");
    }
  };

  return (
    <div className="add-car-form">
      <h2>Add New Car</h2>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="form-grid"
      >
        {/* Left Panel: Image Upload */}
        <div className="left-panel">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="image-input"
          />
          {previewUrls.length > 0 && (
            <div className="preview-container">
              {previewUrls.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`preview-${idx}`}
                  className="preview-img"
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Panel: Form Fields */}
        <div className="right-panel">
          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={formValues.brand}
            onChange={handleChange}
          />
          <input
            type="text"
            name="model"
            placeholder="Model"
            value={formValues.model}
            onChange={handleChange}
          />
          <input
            type="number"
            name="registrationYear"
            placeholder="Registration Year"
            value={formValues.registrationYear}
            onChange={handleChange}
          />
          <input
            type="text"
            name="ownership"
            placeholder="Ownership"
            value={formValues.ownership}
            onChange={handleChange}
          />
          <input
            type="number"
            name="kmDriven"
            placeholder="KM Driven"
            value={formValues.kmDriven}
            onChange={handleChange}
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formValues.location}
            onChange={handleChange}
          />
          <input
            type="text"
            name="registrationNo"
            placeholder="Registration No."
            value={formValues.registrationNo}
            onChange={handleChange}
          />
          <input
            type="text"
            name="color"
            placeholder="Color"
            value={formValues.color}
            onChange={handleChange}
          />

          <label>
            <input
              type="checkbox"
              name="insuranceValid"
              checked={formValues.insuranceValid}
              onChange={handleChange}
            />
            Insurance Valid
          </label>

          <input
            type="text"
            name="fuelType"
            placeholder="Fuel Type"
            value={formValues.fuelType}
            onChange={handleChange}
          />
          <input
            type="text"
            name="transmission"
            placeholder="Transmission"
            value={formValues.transmission}
            onChange={handleChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formValues.price}
            onChange={handleChange}
          />

          <button type="submit">Add Car</button>
        </div>
      </form>
    </div>
  );
};

export default AddCarForm;
