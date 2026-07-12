import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useState } from "react";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";

function Trip() {
  const [search, setSearch] = useState("");

  const columns = [
    "Source",
    "Destination",
    "Vehicle",
    "Driver",
    "Cargo (kg)",
    "Status",
    "Actions",
  ];

  const data = [
    [
      "Ahmedabad",
      "Surat",
      "Van-01",
      "Alex",
      "450",
      <span className="badge bg-warning text-dark">Draft</span>,
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
      "Rajkot",
      "Vadodara",
      "Truck-02",
      "John",
      "900",
      <span className="badge bg-primary">On Trip</span>,
      <>
        <>
    <button className="btn btn-outline-primary btn-sm me-2">
        Edit
    </button>

    <button className="btn btn-outline-danger btn-sm">
        Delete
    </button>
</>
      </>,
    ],

    [
      "Bhavnagar",
      "Ahmedabad",
      "Mini Van",
      "David",
      "300",
      <span className="badge bg-success">Completed</span>,
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

  const filteredData = data.filter((trip) =>
    trip[0].toLowerCase().includes(search.toLowerCase())
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
            Trip Management
          </h2>

          <p className="text-muted">
            Manage transport trips and dispatch operations.
          </p>
        </div>

        <button className="btn btn-primary px-4">
          + Create Trip
        </button>

      </div>

      {/* Card */}
      <div className="card shadow border-0 rounded-4">

        <div className="card-body">

          <SearchBar
            placeholder="Search Trips..."
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

export default Trip;