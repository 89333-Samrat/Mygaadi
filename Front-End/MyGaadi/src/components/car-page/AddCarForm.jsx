import React, { useState } from "react";

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
    const fieldValue = type === "checkbox" ? checked : value;
    setFormValues({ ...formValues, [name]: fieldValue });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("car", JSON.stringify(formValues));
    selectedImages.forEach((file) => {
      formData.append("images", file);
    });

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
    <div className="add-car-form max-w-xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Add New Car</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={formValues.brand}
          onChange={handleChange}
          className="block w-full border p-2 mb-2"
        />
        <input
          type="text"
          name="model"
          placeholder="Model"
          value={formValues.model}
          onChange={handleChange}
          className="block w-full border p-2 mb-2"
        />
        <input
          type="number"
          name="registrationYear"
          placeholder="Registration Year"
          value={formValues.registrationYear}
          onChange={handleChange}
          className="block w-full border p-2 mb-2"
        />
        <input
          type="text"
          name="ownership"
          placeholder="Ownership"
          value={formValues.ownership}
          onChange={handleChange}
          className="block w-full border p-2 mb-2"
        />
        <input
          type="number"
          name="kmDriven"
          placeholder="KM Driven"
          value={formValues.kmDriven}
          onChange={handleChange}
          className="block w-full border p-2 mb-2"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formValues.location}
          onChange={handleChange}
          className="block w-full border p-2 mb-2"
        />
        <input
          type="text"
          name="registrationNo"
          placeholder="Registration No."
          value={formValues.registrationNo}
          onChange={handleChange}
          className="block w-full border p-2 mb-2"
        />
        <input
          type="text"
          name="color"
          placeholder="Color"
          value={formValues.color}
          onChange={handleChange}
          className="block w-full border p-2 mb-2"
        />

        <label className="block mb-2">
          <input
            type="checkbox"
            name="insuranceValid"
            checked={formValues.insuranceValid}
            onChange={handleChange}
            className="mr-2"
          />
          Insurance Valid
        </label>

        <input
          type="text"
          name="fuelType"
          placeholder="Fuel Type"
          value={formValues.fuelType}
          onChange={handleChange}
          className="block w-full border p-2 mb-2"
        />
        <input
          type="text"
          name="transmission"
          placeholder="Transmission"
          value={formValues.transmission}
          onChange={handleChange}
          className="block w-full border p-2 mb-2"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formValues.price}
          onChange={handleChange}
          className="block w-full border p-2 mb-2"
        />

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="block mb-4"
        />

        {previewUrls.length > 0 && (
          <div className="flex gap-2 flex-wrap mb-4">
            {previewUrls.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`preview-${idx}`}
                className="w-24 h-24 object-cover rounded"
              />
            ))}
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Car
        </button>
      </form>
    </div>
  );
};

export default AddCarForm;
