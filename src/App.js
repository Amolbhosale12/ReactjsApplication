import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import EditEmp from "./components/EditEmployee"
import AddEmp from "./components/AddEmployee"

function App() {
  return (
    <BrowserRouter>
      <Routes path="/">
        <Route index element={<Home />} />
        <Route path={"edit/:id"} element={<EditEmp/>}></Route>
        <Route path="add" element={<AddEmp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
