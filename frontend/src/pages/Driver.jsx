import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import { useEffect, useState } from "react";
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

const loadDrivers = async () => {
  try {
    const response = await getDrivers();
    setDrivers(response.data);
  } catch (error) {
    console.error("Error fetching drivers:", error);
  }
};

  const columns = [
    "Name",
    "License",
    "Contact",
    "Status",
    "Safety",
    "Actions",
  ];

  const data = [
    [
      "Alex",
      "DL12345",
      "9876543210",
      <span className="badge bg-success">Available</span>,
      "96",
      <>
        <button className="btn btn-warning btn-sm me-2">
          Edit
        </button>

        <button className="btn btn-danger btn-sm">
          Delete
        </button>
      </>,
    ],

    [
      "John",
      "DL56789",
      "9876501234",
      <span className="badge bg-primary">On Trip</span>,
      "91",
      <>
        <button className="btn btn-warning btn-sm me-2">
          Edit
        </button>

        <button className="btn btn-danger btn-sm">
          Delete
        </button>
      </>,
    ],

    [
      "David",
      "DL88991",
      "9876512345",
      <span className="badge bg-danger">Suspended</span>,
      "85",
      <>
        <button className="btn btn-warning btn-sm me-2">
          Edit
        </button>

        <button className="btn btn-danger btn-sm">
          Delete
        </button>
      </>,
    ],
  ];
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