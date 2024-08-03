import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Select from "react-select";
import { countries } from "../scripts/newUtility";
import { states } from "../scripts/newUtility";
import { districts } from "../scripts/newUtility";

const EditEmployee = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [mobile, setMobileNumber] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const params = useParams();

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

  const UpdateData = (e) => {
    e.preventDefault();
    // data stored in javascript object.

    const nameValidationError = validateName(name);
    const mobileValidationError = validateMobileNumber(mobile);
    const emailValidationError = validateEmail(emailId);

    if (
      !nameValidationError &&
      !mobileValidationError &&
      !emailValidationError
    ) {
      const employee = { name, mobile, emailId, country, state, district };
      // alert(employee.name);
      console.log("parameters =>" + params.id);

      fetch(
        `https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${params.id}`,
        {
          method: "PUT",
          headers: { "content-type": "Application/json" },
          body: JSON.stringify(employee),
        }
      ).then(() => {
        window.history.back();
        console.log("employee data is updated");
      });
      alert("do you want to update?");
    } else {
      alert("Please enter valid Input");
    }
  };

  useEffect(() => {
    fetch(
      `https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${params.id}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        //alert(data.country);
        setId(data.id);
        setName(data.name);
        setMobileNumber(data.mobile);
        setEmailId(data.emailId);
        setCountry(data.country);
        setState(data.state);
        setDistrict(data.district);
      });
  }, []);

  return (
    <div className="container my-5 d-flex justify-content-center">
      <div className="col-12 col-md-7 d-flex flex-column gap-3  p-5 rounded-4 edit-container">
        <div className="text-center label-header">
          <label className="container-label my-2">Update Empployee</label>
        </div>

        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            value={name}
            placeholder="First Name"
            onChange={(e) => setName(e.target.value)}
            id="name"
          />
          <label htmlFor="name">Name</label>
        </div>
        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            id="emailId"
          />
          <label htmlFor="emailId">Email Id</label>
        </div>
        <div className="form-floating">
          <input
            type="Number"
            className="form-control"
            placeholder="Mobile Number"
            value={mobile}
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
            value={country}
            onChange={handleCountryChange}
          />
        </div>
        <div className="form-floating">
          <Select
            placeholder="State"
            id="state"
            options={stateOptions}
            value={state}
            onChange={handleStateChange}
          />
        </div>
        <div className="form-floating">
          <Select
            placeholder="District"
            id="district"
            options={districtOptions}
            value={district}
            onChange={handleDistrictChange}
          />
        </div>

        <div className="d-flex  justify-content-center gap-3">
          <button
            className="btn btn-primary"
            onClick={(e) => {
              UpdateData(e);
            }}
          >
            Update Employee
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              window.history.back();
            }}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};
export default EditEmployee;
