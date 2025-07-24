import "../../Style/AddCarForm.css";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

// SVG icons for the uploader (No changes here)
const CheckmarkIcon = () => (
  <svg className="checkmark" viewBox="0 0 52 52">
    <path className="checkmark__check" fill="none" d="M14 27l10 10 15-20" />
  </svg>
);

const ReloadIcon = () => (
  <svg
    className="reload"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.5 8C14.5 11 12 14.5 8 14.5C4 14.5 1.5 11 1.5 8C1.5 5 4 1.5 8 1.5C10.5 1.5 12.5 3 13.5 4.5M13.5 4.5L10 5M13.5 4.5L14 1"
      stroke="#FF9091"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FileUploadComponent = ({ onFilesUpdate }) => {
  const [files, setFiles] = useState([]);
  const uploadContainerRef = useRef(null);
  const fileInputRef = useRef(null);

  // Effect for drag and drop (No changes needed here)
  useEffect(() => {
    const uploadContainer = uploadContainerRef.current;
    if (!uploadContainer) return;
    const handleDragOver = (e) => {
      e.preventDefault();
      uploadContainer.classList.add("drag");
    };
    const handleDragLeave = () => {
      uploadContainer.classList.remove("drag");
    };
    const handleDrop = (e) => {
      e.preventDefault();
      uploadContainer.classList.remove("drag");
      addNewFiles(Array.from(e.dataTransfer.files));
    };
    uploadContainer.addEventListener("dragover", handleDragOver);
    uploadContainer.addEventListener("dragleave", handleDragLeave);
    uploadContainer.addEventListener("drop", handleDrop);
    return () => {
      uploadContainer.removeEventListener("dragover", handleDragOver);
      uploadContainer.removeEventListener("dragleave", handleDragLeave);
      uploadContainer.removeEventListener("drop", handleDrop);
    };
  }, []);

  // **MODIFIED**: This function now also handles creating preview URLs
  const addNewFiles = (newFiles) => {
    const newFileObjects = newFiles.map((file) => {
      const isImage = file.type.startsWith("image/");
      const fileObject = {
        id: `${file.name}-${Date.now()}`,
        file: file,
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2),
        isImage: isImage,
        progress: 0,
        status: "uploading",
        isLarge: file.size / (1024 * 1024) >= 50,
        previewUrl: null, // Add previewUrl to state
      };

      // Create a preview URL for image files
      if (isImage) {
        const reader = new FileReader();
        reader.onload = (e) => {
          // Update the specific file object with the preview URL
          setFiles((prevFiles) =>
            prevFiles.map((pf) =>
              pf.id === fileObject.id
                ? { ...pf, previewUrl: e.target.result }
                : pf
            )
          );
        };
        reader.readAsDataURL(file);
      }
      return fileObject;
    });

    // Update state with the new file objects (preview will be added async)
    setFiles((prev) => [...prev, ...newFileObjects]);
    onFilesUpdate([...files, ...newFileObjects].map((f) => f.file));
  };

  const handleFileChange = (e) => {
    addNewFiles(Array.from(e.target.files));
  };

  const removeFile = (id) => {
    const updatedFiles = files.filter((f) => f.id !== id);
    setFiles(updatedFiles);
    onFilesUpdate(updatedFiles.map((f) => f.file));
  };

  const retryUpload = (id) => {
    const fileToRetry = files.find((f) => f.id === id);
    if (fileToRetry) {
      removeFile(id);
      setTimeout(() => addNewFiles([fileToRetry.file]), 50);
    }
  };

  // Effect for simulating upload progress (No changes here)
  useEffect(() => {
    const uploadIntervals = [];
    files.forEach((fileItem) => {
      if (fileItem.status === "uploading" && fileItem.progress === 0) {
        if (fileItem.isLarge) {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === fileItem.id ? { ...f, status: "error" } : f
            )
          );
          return;
        }
        const interval = setInterval(() => {
          setFiles((prev) =>
            prev.map((f) => {
              if (f.id === fileItem.id && f.progress < 100) {
                const newProgress = f.progress + 5;
                if (newProgress >= 100) {
                  clearInterval(interval);
                  return { ...f, progress: 100, status: "done" };
                }
                return { ...f, progress: newProgress };
              }
              return f;
            })
          );
        }, Math.random() * 150 + 50);
        uploadIntervals.push(interval);
      }
    });
    return () => uploadIntervals.forEach((interval) => clearInterval(interval));
  }, [files]);

  return (
    <div className="file-upload__container">
      {/* --- Uploader Top Section (No changes here) --- */}
      <div className="file-upload__top">
        <h2 className="file-upload__title">Upload Your Files</h2>
        <p className="file-upload__text">to attach to the project</p>
        <div
          ref={uploadContainerRef}
          className="file-upload__upload"
          onClick={() => fileInputRef.current.click()}
        >
          <div className="file-upload__input-sphere file-upload__first-sphere"></div>
          <div className="file-upload__input-sphere file-upload__second-sphere"></div>
          <input
            type="file"
            id="file-upload-input"
            name="file-upload-input"
            className="file-upload__input"
            multiple
            accept="image/*, application/pdf"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <img
            className="file-upload__input-image"
            src="https://bato-web-agency.github.io/bato-shared/img/files-upload/cloud-icon.svg"
            alt="cloud-upload"
          />
          <p className="file-upload__input-title">
            Drag & drop your files here or <span>Browse</span>
          </p>
          <span className="file-upload__input-text">50 Mb max file size</span>
        </div>
      </div>

      {/* --- Uploading List Section (No changes here) --- */}
      {files.length > 0 && (
        <div className="file-upload__bottom active">
          <h2 className="file-upload__bottom-title">Uploading</h2>
          <div className="file-upload__list">
            {files.map((fileItem) => (
              <div
                key={fileItem.id}
                className={`file-upload__item ${
                  fileItem.status === "error" ? "has-error" : ""
                }`}
              >
                <div className="file-upload__item-icon">
                  <img
                    className="file-icon"
                    src={
                      fileItem.isImage
                        ? "https://bato-web-agency.github.io/bato-shared/img/files-upload/photo-icon.svg"
                        : "https://bato-web-agency.github.io/bato-shared/img/files-upload/file-icon.svg"
                    }
                    alt="icon"
                  />
                </div>
                <div className="file-upload__item-info">
                  <div className="file-upload__item-title">
                    <span className="file-name">
                      {fileItem.name.length > 20
                        ? `${fileItem.name.slice(0, 20)}...`
                        : fileItem.name}
                    </span>
                    <span className="file-upload__item-size">
                      {fileItem.size} Mb
                    </span>
                  </div>
                  <div className="file-upload__item-progress">
                    <div
                      className="file-upload__item-progress-bar"
                      style={{
                        "--progress": `${
                          fileItem.status === "error" && fileItem.isLarge
                            ? 100
                            : fileItem.progress
                        }%`,
                        "--bar-color":
                          fileItem.status === "error" ? "#ff9091" : "#7efde3",
                        "--second-bar-color":
                          fileItem.status === "error" ? "#ff9091" : "#c7fe42",
                      }}
                    ></div>
                  </div>
                  <div className="file-upload__number-progress">
                    {fileItem.status === "error" ? (
                      <span style={{ color: "#ff9091" }}>
                        {fileItem.isLarge
                          ? "File must be less than 50MB."
                          : "Uploading failed"}
                      </span>
                    ) : (
                      <span className="file-upload__item-number">
                        {fileItem.progress}% done
                      </span>
                    )}
                  </div>
                </div>
                <div className="file-upload__icon-box">
                  <div
                    className={`file-upload__delete-btn ${
                      fileItem.status === "done" || fileItem.status === "error"
                        ? "hidden"
                        : ""
                    }`}
                    onClick={() => removeFile(fileItem.id)}
                  >
                    <i></i>
                    <i></i>
                  </div>
                  <div
                    className={`file-upload__done-btn ${
                      fileItem.status === "done" ? "" : "hidden"
                    }`}
                  >
                    <CheckmarkIcon />
                  </div>
                  <div
                    className={`file-upload__reload-btn ${
                      fileItem.status === "error" ? "" : "hidden"
                    }`}
                    onClick={() => retryUpload(fileItem.id)}
                  >
                    <ReloadIcon />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* **NEW**: Image Preview Section */}
      {files.some((f) => f.isImage) && (
        <div className="image-preview-container">
          <h3 className="file-upload__bottom-title">Image Previews</h3>
          <div className="image-preview-list">
            {files.map(
              (fileItem) =>
                fileItem.previewUrl && (
                  <div key={`${fileItem.id}-preview`} className="pip">
                    <img
                      className="imageThumb"
                      src={fileItem.previewUrl}
                      alt={fileItem.name}
                    />
                    <span
                      className="remove"
                      onClick={() => removeFile(fileItem.id)}
                    >
                      Remove
                    </span>
                  </div>
                )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Main AddCarForm component (No changes here)
const AddCarForm = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [formValues, setFormValues] = useState({
    brand: "",
    model: "",
    variant: "",
    registrationYear: "",
    ownership: "",
    kmDriven: "",
    location: "",
    price: "",
    registrationNumber: "",
    color: "",
    insuranceValid: false,
    fuelType: "",
    transmission: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFilesUpdate = (files) => {
    setUploadedFiles(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in first");
      return;
    }

    const formData = new FormData();

    // Append car details as a JSON blob
    const carBlob = new Blob([JSON.stringify(formValues)], {
      type: "application/json",
    });
    formData.append("car", carBlob);

    // Append images
    uploadedFiles.forEach((file) => formData.append("images", file));

    try {
      const res = await axios.post("http://localhost:8080/cars/add", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Car added successfully!");
      console.log(res.data);
    } catch (err) {
      console.error("Error uploading car:", err);
      alert("Failed to upload car");
    }
  };

  return (
    <div className="car-form-container">
      <div className="car-image-section">
        <FileUploadComponent onFilesUpdate={handleFilesUpdate} />
      </div>
      <form className="car-form" onSubmit={handleSubmit}>
        <h2>Add Car Details</h2>
        <div className="form-grid">
          <input
            name="brand"
            placeholder="Brand"
            onChange={handleChange}
            required
          />
          <input
            name="model"
            placeholder="Model"
            onChange={handleChange}
            required
          />
          <input name="variant" placeholder="Variant" onChange={handleChange} />
          <input
            name="registrationYear"
            placeholder="Registration Year"
            type="number"
            onChange={handleChange}
          />
          <select name="ownership" onChange={handleChange}>
            <option value="">Ownership</option>
            <option value="FIRST">First</option>
            <option value="SECOND">Second</option>
            <option value="THIRD">Third</option>
          </select>
          <input
            name="kmDriven"
            placeholder="KM Driven"
            type="number"
            onChange={handleChange}
          />
          <input
            name="location"
            placeholder="Location"
            onChange={handleChange}
          />
          <input
            name="price"
            placeholder="Price (₹)"
            type="number"
            onChange={handleChange}
          />
          <input
            name="registrationNumber"
            placeholder="Registration Number"
            onChange={handleChange}
          />
          <input name="color" placeholder="Color" onChange={handleChange} />
          <select name="fuelType" onChange={handleChange}>
            <option value="">Fuel Type</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
          </select>
          <select name="transmission" onChange={handleChange}>
            <option value="">Transmission</option>
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
          </select>
          <input
            name="description"
            placeholder="Description"
            onChange={handleChange}
          />
          <label className="checkbox">
            <input
              type="checkbox"
              name="insuranceValid"
              onChange={handleChange}
            />{" "}
            Insurance Valid
          </label>
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddCarForm;
