// MultiStepForm.js
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CommonTextField from "./CommonTextField";
import Dropzone from "../CommonDropzone/Dropzone";
import Thumb from "../Thumb";
import Select from "../CommonSelectField/Select";
const initialValues = {
  // User Details
  firstName: "",
  lastName: "",
  email: "",

  street: "",
  city: "",
  state: "",
  zip: "",

  phoneNumber: "",
  flagImage: "",
};

const RadioButtonQuestion = ({
  question,
  options,
  selectedOption,
  onChange,
}) => {
  return (
    <div
      className="form-group d-flex gap-5 mt-4"
      style={{ width: "max-content" }}
    >
      <label className="form-label">{question}</label>
      {options.map((option, index) => (
        <div key={index} className="form-check">
          <input
            type="radio"
            id={`radio-${index}`}
            className="form-check-input"
            value={option}
            checked={selectedOption === option}
            onChange={() => onChange(option)}
          />
          <label className="form-check-label" htmlFor={`radio-${index}`}>
            {option}
          </label>
        </div>
      ))}
    </div>
  );
};
const MultiStepForm = () => {
  const gender = [
    { id: 1, value: "male" },
    { id: 2, value: "female" },
  ];
  const [img, setImg] = useState(null);
  const [step, setStep] = useState(1);
  const [formErrors, setFormErrors] = useState(false);
  const validationSchema = Yup.object().shape({
    // Validation schema for each step
    // You can define validation rules according to your requirements
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    street: Yup.string().required("Street is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    zip: Yup.string().required("ZIP code is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
  });
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    // Submit logic here, you can perform the final submission
    console.log(values);
    setSubmitting(false);
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="card w-50">
        <div className="card-header">
          <Stepper step={step} setStep={setStep} errors={formErrors} />
        </div>
        <div className="card-body">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form>
                {step === 1 && (
                  <div>
                    <h2 className="text-primary">General Details</h2>
                    <div className="row">
                      <div className="col-6">
                        <CommonTextField
                          type={"text"}
                          name={"firstName"}
                          label={"First Name"}
                        />
                      </div>
                      <div className="col-6">
                        <CommonTextField
                          type={"text"}
                          name={"lastName"}
                          label={"Last Name"}
                        />
                      </div>
                      <div className="col-6">
                        <Select
                          value={formik?.values?.name}
                          name="name"
                          label="Gender"
                          required={true}
                          formikRequired={
                            formik?.errors?.name && formik?.touched?.name
                          }
                          options={gender}
                          getOptionLabel={(option) => option?.value}
                          getOptionValue={(option) => option?.id}
                          onChange={(selected) => {
                            if (selected) {
                              formik.setFieldValue("name", selected);
                              formik.setFieldValue(
                                "countryCode",
                                selected?.isoCode
                              );
                              formik.setFieldValue(
                                "phoneCode",
                                selected?.phonecode
                              );
                            } else {
                              formik.setFieldValue("name", "");
                              formik.setFieldValue("countryCode", "");
                              formik.setFieldValue("phoneCode", "");
                            }
                          }}
                        />
                      </div>
                      <div className="col-6">
                        <CommonTextField
                          type={"text"}
                          name={"permanentAddress"}
                          label={"Permanient Address"}
                        />
                      </div>
                      <div className="col-6">
                        <CommonTextField
                          type={"number"}
                          name={"citizenshipNo"}
                          label={"Citizenship Number"}
                        />
                      </div>
                      <div className="col-6">
                        <CommonTextField
                          type={"text"}
                          name={"fatherName"}
                          label={"Father Name"}
                        />
                      </div>
                      <div className="col-6">
                        <CommonTextField
                          type={"text"}
                          name={"spouseName"}
                          label={"Spouse Name"}
                        />
                      </div>
                      <div className="col-6">
                        <CommonTextField
                          type={"number"}
                          name={"contactNumber"}
                          label={"Contact Number"}
                        />
                      </div>
                    </div>

                    <button
                      className="btn-next btn-primary btn mt-4"
                      type="button"
                      onClick={() => setStep(2)}
                    >
                      Next
                    </button>
                  </div>
                )}
                {step === 2 && (
                  <div>
                    <h2 className="text-primary">Address Details</h2>
                    <div className="row">
                      <div className="col-6 d-flex justify-content-center">
                        <Dropzone
                          name="flagImage"
                          label="Flag Image"
                          onChange={(event) => {
                            formik.setFieldValue(
                              "flagImage",
                              event.target.files[0]
                            );
                            let reader = new FileReader();
                            reader.readAsDataURL(event.target.files[0]);
                            reader.onloadend = () => setImg([reader.result]);
                          }}
                          removePhoto={() => {
                            formik.setFieldValue("flagImage", "");
                            setImg(null);
                          }}
                          displayImage={
                            img ? <Thumb thumb={img} /> : <Thumb thumb={img} />
                          }
                          error={formik.errors.flagImage}
                          text={"Max file size is 500 KB."}
                        />
                      </div>
                      <div className="col-6 d-flex justify-content-center">
                        <Dropzone
                          name="flagImage"
                          label=" In case of Mionor/Underage, Birth Certificate"
                          onChange={(event) => {
                            formik.setFieldValue(
                              "flagImage",
                              event.target.files[0]
                            );
                            let reader = new FileReader();
                            reader.readAsDataURL(event.target.files[0]);
                            reader.onloadend = () => setImg([reader.result]);
                          }}
                          removePhoto={() => {
                            formik.setFieldValue("flagImage", "");
                            setImg(null);
                          }}
                          displayImage={
                            img ? <Thumb thumb={img} /> : <Thumb thumb={img} />
                          }
                          error={formik.errors.flagImage}
                          text={"Max file size is 500 KB."}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 d-flex justify-content-center">
                        <RadioButtonQuestion
                          question="Required Document?"
                          options={["Yes", "No"]}
                          selectedOption={selectedOption}
                          onChange={handleOptionChange}
                        />
                      </div>
                    </div>

                    <div className="row mt-4">
                      <div className="col-6 d-flex justify-content-center">
                        <Dropzone
                          name="flagImage"
                          label="Flag Image"
                          onChange={(event) => {
                            formik.setFieldValue(
                              "flagImage",
                              event.target.files[0]
                            );
                            let reader = new FileReader();
                            reader.readAsDataURL(event.target.files[0]);
                            reader.onloadend = () => setImg([reader.result]);
                          }}
                          removePhoto={() => {
                            formik.setFieldValue("flagImage", "");
                            setImg(null);
                          }}
                          displayImage={
                            img ? <Thumb thumb={img} /> : <Thumb thumb={img} />
                          }
                          error={formik.errors.flagImage}
                          text={"Max file size is 500 KB."}
                        />
                      </div>
                      <div className="col-6 d-flex justify-content-center">
                        <Dropzone
                          name="flagImage"
                          label=" In case of Mionor/Underage, Birth Certificate"
                          onChange={(event) => {
                            formik.setFieldValue(
                              "flagImage",
                              event.target.files[0]
                            );
                            let reader = new FileReader();
                            reader.readAsDataURL(event.target.files[0]);
                            reader.onloadend = () => setImg([reader.result]);
                          }}
                          removePhoto={() => {
                            formik.setFieldValue("flagImage", "");
                            setImg(null);
                          }}
                          displayImage={
                            img ? <Thumb thumb={img} /> : <Thumb thumb={img} />
                          }
                          error={formik.errors.flagImage}
                          text={"Max file size is 500 KB."}
                        />
                      </div>
                    </div>
                    <button
                      className="btn btn-light mt-4"
                      type="button"
                      onClick={prevStep}
                    >
                      Previous
                    </button>
                    <button
                      className="btn btn-primary mt-4"
                      type="button"
                      onClick={nextStep}
                    >
                      Next
                    </button>
                  </div>
                )}
                {step === 3 && (
                  <div>
                    <h2 className="text-primary">Other Details</h2>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        Default checkbox
                      </label>
                    </div>
                    <button
                      className="btn-previous btn btn-light mt-4"
                      type="button"
                      onClick={prevStep}
                    >
                      Previous
                    </button>
                    <button className="btn btn-primary  mt-4" type="submit">
                      Submit
                    </button>
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

const Stepper = ({ step, setStep, errors }) => {
  const handleClick = (clickedStep) => {
    setStep(clickedStep);
  };
  console.log(errors);

  return (
    <ul className="stepper">
      <li
        className={
          step === 1 || step === 2 || step === 3
            ? errors
              ? "error"
              : "active"
            : ""
        }
        onClick={() => handleClick(1)}
      >
        User Details
      </li>
      <li
        className={
          step === 2 || step === 3 ? (errors ? "error" : "active") : ""
        }
        onClick={() => handleClick(2)}
      >
        Address Details
      </li>
      <li
        className={step === 3 ? (errors ? "error" : "active") : ""}
        onClick={() => handleClick(3)}
      >
        Other Details
      </li>
    </ul>
  );
};

export default MultiStepForm;
