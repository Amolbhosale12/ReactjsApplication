import React, { useEffect, useState } from "react";
import "./Style.css";
import { useNavigate } from "react-router-dom";
import EditButton from "../assets/Images/Edit-Icon.png";
import DeleteIcon from "../assets/Images/Delete-Icon.png";

function Home() {
  const [employee, setEmployee] = useState([]);
  const [filteredEmployee, setFilteredEmployee] = useState([]);
  const navigate = useNavigate();

  // API Calling at the time of application initialization and get information about employees.
  useEffect(() => {
    fetch("https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error retrieving data");
        }
        return res.json();
      })
      .then((data) => {
        const reversedData = data.reverse();
        setEmployee(reversedData);
        setFilteredEmployee(reversedData);
      })
      .catch((error) => {
        console.log("Failed to retrieve data: ", error);
      });
  }, []);

  const deleteEmployee = async (id) => {
    const confirmDelete = window.confirm("Do you want to delete the record?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the employee.");
      }

      const updatedEmployees = employee.filter((employe) => employe.id !== id);
      setEmployee(updatedEmployees);
      setFilteredEmployee(updatedEmployees);

      console.log("Successfully deleted.");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const filterData = (EmpId) => {
    if(!(EmpId=="")){
      const filteredEmployees = employee.filter(
        (employe) => employe.id === EmpId
      );
      setFilteredEmployee(filteredEmployees);
    }
    else{
      setEmployee(employee);
      window.location.reload();
    }
    
  };

  return (
    <div className="container d-flex mt-5 flex-column gap-4 main-container">
      <div className="text-center label-header">
        <label className="container-label">Employee Information</label>
      </div>
      <div>
        <button className="btn btn-primary" onClick={() => navigate("/add")}>
          Add Employee
        </button>
      </div>

      <div>
        <input
          type="search"
          placeholder="search by Id"
          className="form-control"
          onChange={(e) => filterData(e.target.value)}
        />
      </div>

      <div>
        <table className="table table-bordered table-light">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Employee Name</th>
              <th>Email ID</th>
              <th>Mobile Number</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody id="employeeTableBody">
            {filteredEmployee.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.emailId}</td>
                <td>{item.mobile}</td>
                <td
                  onClick={() => {
                    navigate(`/edit/${item.id}`);
                  }}
                >
                  <img
                    src={EditButton}
                    alt="editbutton"
                    className="edit-Image"
                  />
                </td>
                <td>
                  <img
                    onClick={() => deleteEmployee(item.id)}
                    src={DeleteIcon}
                    alt="delete-icon"
                    className="delete-icon"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
