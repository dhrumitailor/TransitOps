import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useState } from "react";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";

function Maintenance() {
  const [search, setSearch] = useState("");

  const columns = [
    "Vehicle",
    "Maintenance Type",
    "Date",
    "Cost",
    "Status",
    "Actions",
  ];

  const data = [
    [
      "Van-01",
      "Oil Change",
      "12-07-2026",
      "₹2,500",
      <span className="badge bg-success">Completed</span>,
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
      "Brake Repair",
      "13-07-2026",
      "₹8,500",
      <span className="badge bg-warning text-dark">Pending</span>,
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
      "Tyre Change",
      "14-07-2026",
      "₹4,200",
      <span className="badge bg-info text-dark">
        In Progress
      </span>,
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

  const filteredData = data.filter((maintenance) =>
    maintenance[0].toLowerCase().includes(search.toLowerCase())
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
            Maintenance Management
          </h2>

          <p className="text-muted">
            Manage vehicle maintenance records.
          </p>
        </div>

        <button className="btn btn-primary px-4">
          + Add Maintenance
        </button>

      </div>

      <div className="card shadow border-0 rounded-4">

        <div className="card-body">

          <SearchBar
            placeholder="Search Maintenance..."
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

export default Maintenance;