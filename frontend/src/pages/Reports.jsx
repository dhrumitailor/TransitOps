import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import { useState } from "react";

function Reports() {
    const kpiData = [
  {
    title: "Fuel Efficiency",
    value: "12.4 km/L",
    border: "primary",
  },
  {
    title: "Fleet Utilization",
    value: "81%",
    border: "success",
  },
  {
    title: "Operational Cost",
    value: "₹1,34,070",
    border: "warning",
  },
  {
    title: "Vehicle ROI",
    value: "14.2%",
    border: "info",
  },
];
  const [search, setSearch] = useState("");

  const columns = [
  "Vehicle",
  "Fuel Cost",
  "Maintenance Cost",
  "ROI",
  "Trips",
  "Status",
];

  const data = [
    [
  "Van-01",
  "₹12,000",
  "₹2,500",
  "22%",
  "34",
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
      <p className="text-end text-muted">
  Last Updated: 12 July 2026, 12:30 PM
</p>
      

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="fw-bold mb-1">
            Reports & Analytics
          </h2>

          <p className="text-muted">
            Monitor fleet performance and operational insights.
          </p>
        </div>

       <div className="d-flex gap-2">
  <button className="btn btn-success">
    Export CSV
  </button>
  <span className="badge bg-secondary">
  Report Generated: Today
</span>

  <button className="btn btn-danger">
    Export PDF
  </button>
</div>

      </div>
      <div className="card shadow-sm border-0 mb-4">
  <div className="card-body">
    <h5 className="mb-4">Top Costliest Vehicles</h5>

    <p className="mb-1">Truck-02</p>
    <div className="progress mb-3">
      <div className="progress-bar bg-danger" style={{ width: "90%" }}>
        ₹25,000
      </div>
    </div>

    <p className="mb-1">Van-01</p>
    <div className="progress mb-3">
      <div className="progress-bar bg-warning" style={{ width: "55%" }}>
        ₹12,000
      </div>
    </div>

    <p className="mb-1">Mini Van</p>
    <div className="progress">
      <div className="progress-bar bg-primary" style={{ width: "35%" }}>
        ₹9,000
      </div>
    </div>
  </div>
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
            <div className="row mb-3">
  <div className="col-md-4">
    <select className="form-select">
      <option>All Vehicles</option>
      <option>Van-01</option>
      <option>Truck-02</option>
      <option>Mini Van</option>
    </select>
  </div>

  <div className="col-md-4">
    <select className="form-select">
      <option>This Month</option>
      <option>Last Month</option>
      <option>This Year</option>
    </select>
  </div>

  <div className="col-md-4">
    <select className="form-select">
      <option>All Status</option>
      <option>Good</option>
      <option>Average</option>
      <option>Excellent</option>
    </select>
  </div>
</div><div className="row g-3 mb-4">

  <div className="col-md-3">
    <div className="card border-0 shadow-sm text-center">
      <div className="card-body">
        <h6 className="text-muted">Total Vehicles</h6>
        <h2 className="text-primary">18</h2>
      </div>
    </div>
  </div>

  <div className="col-md-3">
    <div className="card border-0 shadow-sm text-center">
      <div className="card-body">
        <h6 className="text-muted">Total Trips</h6>
        <h2 className="text-success">146</h2>
      </div>
    </div>
  </div>

  <div className="col-md-3">
    <div className="card border-0 shadow-sm text-center">
      <div className="card-body">
        <h6 className="text-muted">Total Fuel Used</h6>
        <h2 className="text-warning">4,580 L</h2>
      </div>
    </div>
  </div>

  <div className="col-md-3">
    <div className="card border-0 shadow-sm text-center">
      <div className="card-body">
        <h6 className="text-muted">Total Revenue</h6>
        <h2 className="text-danger">₹5.8L</h2>
      </div>
    </div>
  </div>

</div>
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