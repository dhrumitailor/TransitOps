import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";

import {
  getDrivers,
  addDriver,
  updateDriver,
  deleteDriver,
} from "../services/driverService";
function Driver() {
  const [search, setSearch] = useState("");
  const [drivers, setDrivers] = useState([]);
useEffect(() => {
  loadDrivers();
}, []);

async function loadDrivers() {
  try {
    const response = await getDrivers();
    setDrivers(response.items);
  } catch (error) {
    console.error(error);
  }
}



  const columns = [
    "Name",
    "License",
    "Contact",
    "Status",
    "Safety",
    "Actions",
  ];

const data = drivers.map((driver) => [
  driver.name,
  driver.license_number,
  driver.contact_number,

  <span
    className={`badge ${
      driver.status === "Available"
        ? "bg-success"
        : driver.status === "On Trip"
        ? "bg-primary"
        : "bg-danger"
    }`}
  >
    {driver.status}
  </span>,

  driver.safety_score,

  <>
    <button className="btn btn-warning btn-sm me-2">
      Edit
    </button>

    <button className="btn btn-danger btn-sm">
      Delete
    </button>
  </>,
]);
const filteredData = data.filter((driver) =>
  driver[0].toLowerCase().includes(search.toLowerCase())
);
  return (
 <div className="d-flex">

    <Sidebar />

    <div className="flex-grow-1">

      <Navbar />

      <div className="container-fluid p-4">      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="fw-bold mb-1">
            Driver Management
          </h2>

          <p className="text-muted">
            Manage driver records and license information.
          </p>
        </div>

        <button className="btn btn-primary px-4">
    + Add Driver
</button>

      </div>

      {/* Search */}
      <div className="card shadow-sm border-0">

  <div className="card-body">

    <SearchBar
      placeholder="Search Drivers..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />

    <Table
  columns={columns}
  data={filteredData}
/>

  </div>

</div>
</div></div>
    </div>
  );
}

export default Driver;