import { useState } from "react";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";

function Expense() {
  const [search, setSearch] = useState("");

  const columns = [
    "Expense Type",
    "Vehicle",
    "Amount",
    "Date",
    "Status",
    "Actions",
  ];

  const data = [
    [
      "Toll",
      "Van-01",
      "₹500",
      "12-07-2026",
      <span className="badge bg-success">Paid</span>,
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
      "Parking",
      "Truck-02",
      "₹300",
      "13-07-2026",
      <span className="badge bg-warning text-dark">
        Pending
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

    [
      "Insurance",
      "Mini Van",
      "₹4,500",
      "14-07-2026",
      <span className="badge bg-success">Paid</span>,
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

  const filteredData = data.filter((expense) =>
    expense[0].toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container-lg py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="fw-bold mb-1">
            Expense Management
          </h2>

          <p className="text-muted">
            Manage operational expenses.
          </p>
        </div>

        <button className="btn btn-primary px-4">
          + Add Expense
        </button>

      </div>

      <div className="card shadow border-0 rounded-4">

        <div className="card-body">

          <SearchBar
            placeholder="Search Expenses..."
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
  );
}

export default Expense;