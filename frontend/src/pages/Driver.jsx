import { useState } from "react";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";

function Driver() {
  const [search, setSearch] = useState("");

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

  return (
    <div className="container mt-4">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="fw-bold mb-1">
            Driver Management
          </h2>

          <p className="text-muted">
            Manage driver records and license information.
          </p>
        </div>

        <button className="btn btn-primary">
          + Add Driver
        </button>

      </div>

      {/* Search */}
      <SearchBar
        placeholder="Search Drivers..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <Table
        columns={columns}
        data={data}
      />

    </div>
  );
}

export default Driver;