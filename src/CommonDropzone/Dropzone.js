import "./Dropzone.css";
import React from "react";



import image from "./Vector.png";
import { ErrorMessage } from "formik";
const Dropzone = ({
  name,
  label,
  onChange,
  removePhoto,
  displayImage,
  isNotFormik,
  text,
  error,
  type,
}) => {
  let deleteButtonClass = displayImage ? "delete-button show" : "delete-button";
  const handleClick = () => {
    removePhoto();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const acceptedExtensions = ["jpeg", "jpg", "png"];

    if (file) {
      const extension = file.name.split(".").pop().toLowerCase();
      if (!acceptedExtensions.includes(extension)) {
        console.log("object");
        return;
      }
    }

    onChange(event);
  };

  return (
    <div className="common-dropzone-wrapper">
      <label className="form-label">{label}</label>

      <label
        className="custom-dropzone"
        htmlFor={name}
        onClick={() => (document.getElementById(`${name}`).value = null)}
      >
        {displayImage !== "" ? (
          displayImage
        ) : (
          <>
            <img src={image} alt="image-logo" />
            <p>Select {label}</p>
          </>
        )}
      </label>

      {type != "lead" && (
        <div className={deleteButtonClass} onClick={handleClick}>
        
        </div>
      )}
      <input
        type="file"
        id={name}
        name={name}
        className="form-control"
        onChange={handleFileChange}
      />
      {!isNotFormik && <ErrorMessage name={name} component={"div"} />}
      {!error && <span>{text}</span>}
    </div>
  );
};

export default Dropzone;
