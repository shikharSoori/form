import React, { useState } from "react";
import "./App.css";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import MultiStepForm from "./MultiStepForm/MultiStepForm";
function App() {
  return (
    <div className="App">
      <Navbar />
      <MultiStepForm />
    </div>
  );
}

export default App;
