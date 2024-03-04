import React, { useState } from "react";

const Form = () => {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState();
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    setFile(URL.createObjectURL(event.target.files[0]));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter your name:
          <input
            type="text"
            name="username"
            value={inputs.username || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Enter your age:
          <input
            type="number"
            name="age"
            value={inputs.age || ""}
            onChange={handleChange}
          />
        </label>

        <h2>Add Image:</h2>
        <input type="file" onChange={handleChange} />
        <img src={file} />
        <input type="submit" />
      </form>
    </div>
  );
};

export default Form;
