import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";
import ChartCard from "../components/ChartCard";

import "bootstrap/dist/css/bootstrap.min.css";

function Dashboard() {
    const [dashboard, setDashboard] = useState({
  total_vehicles: 0,
  available_vehicles: 0,
  vehicles_on_trip: 0,
  vehicles_in_maintenance: 0,
  total_drivers: 0,
  total_trips: 0,
  completed_trips: 0,
  total_revenue: 0,
  total_fuel_cost: 0,
  total_expenses: 0,
  profit: 0,
});

useEffect(() => {
  const fetchDashboard = async () => {
    try {
      const response = await api.get("/dashboard");
      setDashboard(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchDashboard();
}, []);
  return (
  <div className="d-flex">

    <Sidebar />

    <div className="flex-grow-1">

      <Navbar />

      <div className="container-fluid p-4">

        <h2 className="fw-bold mb-4">
          Dashboard
        </h2>

        <div className="row mb-4">

  <div className="col-lg-3 col-md-6">
    <input
      className="form-control"
      placeholder="Search..."
    />
  </div>

  <div className="col-md-2">
    <select className="form-select">
      <option>Vehicle Type: All</option>
      <option>Truck</option>
      <option>Van</option>
    </select>
  </div>

  <div className="col-md-2">
    <select className="form-select">
      <option>Status: All</option>
      <option>Available</option>
      <option>On Trip</option>
      <option>Maintenance</option>
    </select>
  </div>

  <div className="col-md-2">
    <select className="form-select">
      <option>Region: All</option>
      <option>North</option>
      <option>South</option>
      <option>East</option>
      <option>West</option>
    </select>
  </div>

</div>

        <div className="row g-4">

          <div className="col-lg-3 col-md-6">
            <DashboardCard
  title="Total Vehicles"
 value={dashboard.total_vehicles}
  color="#0d6efd"
/>
          </div>

          <div className="col-lg-3 col-md-6">
            <DashboardCard
  title="Active Trips"
value={dashboard.total_trips}
  color="#198754"
/>
          </div>

          <div className="col-lg-3 col-md-6">
            <DashboardCard
  title="Available Drivers"
  value={dashboard.total_drivers}
  color="#ffc107"
/>
          </div>

          <div className="col-lg-3 col-md-6">
<DashboardCard
  title="Maintenance Due"
  value={dashboard.vehicles_in_maintenance}
  color="#dc3545"
/>
          </div>

          <div className="col-lg-3 col-md-6">
  <DashboardCard
    title="Trips Today"
    value={dashboard.completed_trips}
    color="#17a2b8"
  />
</div>

<div className="col-lg-3 col-md-6">
  <DashboardCard
    title="Fuel Cost"
    value={`₹${dashboard.total_fuel_cost}`}
    color="#6c757d"
  />
</div>

        </div>

<div className="row mt-4">

  <div className="col-lg-8">

    <div className="card shadow-sm">

      <div className="card-header fw-bold">
        Recent Trips
      </div>

      <div className="card-body">

        <table className="table">

          <thead>

            <tr>
              <th>Trip ID</th>
              <th>Vehicle</th>
              <th>Driver</th>
              <th>Status</th>
            </tr>

          </thead>

          <tbody>

            <tr>
              <td>T001</td>
              <td>Tata Ace</td>
              <td>Rahul</td>
              <td>
                <span className="badge bg-success">
                  Completed
                </span>
              </td>
            </tr>

            <tr>
              <td>T002</td>
              <td>Ashok Leyland</td>
              <td>Amit</td>
              <td>
                <span className="badge bg-warning text-dark">
                  Running
                </span>
              </td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>

  </div>

  <div className="col-lg-4">
    <ChartCard />
  </div>

</div>

      </div>

    </div>

  </div>
);
}

export default Dashboard;