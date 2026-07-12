import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useState } from "react";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";

function Fuel() {
  const [search, setSearch] = useState("");

  const columns = [
    "Vehicle",
    "Fuel (Liters)",
    "Cost",
    "Date",
    "Mileage",
    "Actions",
  ];

  const data = [
    [
      "Van-01",
      "40 L",
      "₹3,200",
      "12-07-2026",
      "12 km/L",
      <>
        <button className="btn btn-outline-primary btn-sm me-2">
          Edit
        </button>

        <button className="btn btn-outline-danger btn-sm">
          Delete
        </button>
      </>,
    ],

    [
      "Truck-02",
      "80 L",
      "₹6,500",
      "13-07-2026",
      "8 km/L",
      <>
        <button className="btn btn-outline-primary btn-sm me-2">
          Edit
        </button>

        <button className="btn btn-outline-danger btn-sm">
          Delete
        </button>
      </>,
    ],

    [
      "Mini Van",
      "35 L",
      "₹2,800",
      "14-07-2026",
      "13 km/L",
      <>
        <button className="btn btn-outline-primary btn-sm me-2">
          Edit
        </button>

        <button className="btn btn-outline-danger btn-sm">
          Delete
        </button>
      </>,
    ],
  ];

  const filteredData = data.filter((fuel) =>
    fuel[0].toLowerCase().includes(search.toLowerCase())
  );

    return (
  <div className="d-flex">

    <Sidebar />

    <div className="flex-grow-1">

      <Navbar />

      <div className="container-fluid p-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="fw-bold mb-1">
            Fuel Management
          </h2>

          <p className="text-muted">
            Manage fuel logs and consumption records.
          </p>
        </div>

        <button className="btn btn-primary px-4">
          + Add Fuel Log
        </button>

      </div>

      <div className="card shadow border-0 rounded-4">

        <div className="card-body">

          <SearchBar
            placeholder="Search Fuel Logs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Table
            columns={columns}
            data={filteredData}
          />

        </div>

      </div>
      </div>

      </div>

    </div>
  );
}

export default Fuel;