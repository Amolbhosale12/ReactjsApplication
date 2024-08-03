import React, { useEffect, useState } from "react";
import "./Style.css";
import { useNavigate } from "react-router-dom";
import EditButton from "../assets/Images/Edit-Icon.png";
import DeleteIcon from "../assets/Images/Delete-Icon.png";

function Home() {
  const [employee, setEmployee] = useState([]);
  const navigate = useNavigate();

  // API Calling at the time of application initialization and get information about employees.

  useEffect(() => {
    fetch("https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setEmployee(data);
        console.log(data);
      });
  }, []);

  const deleteEmployee = async (id) => {
    const confirmDelete = window.confirm("Do you want to delete the record?");
    if (!confirmDelete) return;
  
    try {
      const response = await fetch(`https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the employee.");
      }
      const res = await fetch("https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee");
      const data = await res.json();
      setEmployee(data);
  
      console.log("Successfully deleted.");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  return (
    <div className="container d-flex mt-5 flex-column gap-4 main-container">
      <div className="text-center label-header"><label className="container-label">Employee Information</label></div>
      <div>
        <button className="btn btn-primary" onClick={() => navigate("/add")}>
          Add Employee
        </button>
       
      </div>
      <div>
        <table className="table  table-bordered table-light">
          <thead>
            <tr>
              {/* <th>Sr No.</th> */}
              <th>Employee ID</th>
              <th>Employee Name</th>
              <th>Email ID</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {employee.map((item) => {
              return (
                <tr key={item.id}>
                  {/* <td></td> */}
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.emailId}</td>
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
                      onClick={() => {
                        deleteEmployee(item.id);
                      }}
                      src={DeleteIcon}
                      alt="delete-icon"
                      className="delete-icon"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
