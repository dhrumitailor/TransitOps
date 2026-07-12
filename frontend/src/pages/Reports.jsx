import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import { useState } from "react";

function Reports() {
  const [search, setSearch] = useState("");

  const columns = [
    "Vehicle",
    "Fuel Cost",
    "Maintenance Cost",
    "ROI",
    "Status",
  ];

  const data = [
    [
      "Van-01",
      "₹12,000",
      "₹2,500",
      "22%",
      <span className="badge bg-success">Good</span>,
    ],

    [
      "Truck-02",
      "₹25,000",
      "₹8,500",
      "15%",
      <span className="badge bg-warning text-dark">Average</span>,
    ],

    [
      "Mini Van",
      "₹9,000",
      "₹4,200",
      "28%",
      <span className="badge bg-primary">Excellent</span>,
    ],
  ];

  const filteredData = data.filter((report) =>
    report[0].toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container-lg py-4">

      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="fw-bold mb-1">
            Reports & Analytics
          </h2>

          <p className="text-muted">
            Monitor fleet performance and operational insights.
          </p>
        </div>

        <button className="btn btn-success px-4">
          Export CSV
        </button>

      </div>

      {/* KPI Cards */}

      <div className="row g-3 mb-4">

        <div className="col-md-3">
          <div className="card shadow-sm border-0 text-center">
            <div className="card-body">
              <h6 className="text-muted">Fuel Efficiency</h6>
              <h3>12 km/L</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0 text-center">
            <div className="card-body">
              <h6 className="text-muted">Fleet Utilization</h6>
              <h3>82%</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0 text-center">
            <div className="card-body">
              <h6 className="text-muted">Operational Cost</h6>
              <h3>₹1.45L</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0 text-center">
            <div className="card-body">
              <h6 className="text-muted">Average ROI</h6>
              <h3>21%</h3>
            </div>
          </div>
        </div>

      </div>

      {/* Table */}

      <div className="card shadow border-0 rounded-4">

        <div className="card-body">

          <SearchBar
            placeholder="Search Reports..."
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

export default Reports;