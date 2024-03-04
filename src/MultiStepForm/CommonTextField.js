import { ErrorMessage, Field } from "formik";
import React from "react";

const CommonTextField = ({ label, type, name }) => {
  return (
    <div className="form-group d-flex flex-column  text-left">
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <Field className="form-control" type={type} name={name} id={name} />
      <ErrorMessage
        name={name}
        component="div"
        className="error-message form-text text-start"
      />
    </div>
  );
};

export default CommonTextField;
