import React, { useEffect, useState } from "react";
import Select from "react-select";
import { countries } from "../scripts/newUtility";
import { states } from "../scripts/newUtility";
import { districts } from "../scripts/newUtility";
import axios from "axios";

const AddEmployee = () => {
  const [name, setName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [mobile, setMobileNumber] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");

  // Validation for Name
  const validateName = (name) => {
    if (!name) {
      return "Name is required.";
    } else if (name.length < 3) {
      return "Name must be at least 3 characters long.";
    }
    return "";
  };

  // Validation for Mobile Number
  const validateMobileNumber = (mobile) => {
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobile) {
      return "Mobile number is required.";
    } else if (!mobileRegex.test(mobile)) {
      return "Mobile number must be 10 digits.";
    }
    return "";
  };

  // Validation for Email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return "Email is required.";
    } else if (!emailRegex.test(email)) {
      return "Email is invalid.";
    }
    return "";
  };

  const handleCountryChange = (selectedOption) => {
    setCountry(selectedOption);
  };

  const handleStateChange = (selectedOption) => {
    setState(selectedOption);
  };

  const handleDistrictChange = (selectedOption) => {
    setDistrict(selectedOption);
  };

  const countryOptions = countries.map((country) => ({
    value: country.code,
    label: country.name,
  }));
  const stateOptions = states.map((state) => ({
    value: state.key,
    label: state.name,
  }));
  const districtOptions = districts.map((district) => ({
    value: district.district_id,
    label: district.district_name,
  }));

  const submitData = (e) => {
    e.preventDefault();
    const nameValidationError = validateName(name);
    const mobileValidationError = validateMobileNumber(mobile);
    const emailValidationError = validateEmail(emailId);

    if (
      !nameValidationError &&
      !mobileValidationError &&
      !emailValidationError
    ) {
      const listEmployee = { name, emailId, mobile, country, state, district };
      fetch("https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(listEmployee),
      }).then(() => {
        window.history.back();
        console.log("data stored");
      });
    } else {
      // wrong input from user then display this alert message.
      alert("Please enter valid Input");
    }
  };

  return (
    <div className="container my-4 d-flex justify-content-center ">
      <div className="col-12 col-md-6 d-flex flex-column gap-3  p-5 rounded-4 add-container">
        <div className="text-center label-header">
          <label className="container-label my-2">Add Empployee</label>
        </div>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            placeholder="Employee Name"
            onChange={(e) => setName(e.target.value)}
            id="name"
          />
          <label htmlFor="name">Employee Name</label>
        </div>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            placeholder="Email Id"
            onChange={(e) => setEmailId(e.target.value)}
            id="emailId"
          />
          <label htmlFor="emailId">Email ID</label>
        </div>
        <div className="form-floating">
          <input
            type="Number"
            className="form-control"
            placeholder="Mobile Number"
            onChange={(e) => setMobileNumber(e.target.value)}
            id="mobile"
          />
          <label htmlFor="mobile">Mobile Number</label>
        </div>

        <div className="form-floating">
          <Select
            placeholder="Country"
            id="country"
            options={countryOptions}
            onChange={handleCountryChange}
          />
        </div>
        <div className="form-floating">
          <Select
            placeholder="State"
            id="state"
            options={stateOptions}
            onChange={handleStateChange}
          />
        </div>
        <div className="form-floating">
          <Select
            placeholder="District"
            id="district"
            options={districtOptions}
            onChange={handleDistrictChange}
          />
        </div>

        <div className="d-flex  justify-content-center gap-3">
          <button
            className="btn btn-primary"
            onClick={(e) => {
              submitData(e);
            }}
          >
            Add Employee
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              window.history.back();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddEmployee;
