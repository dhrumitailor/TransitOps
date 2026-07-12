import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardCard from "../components/DashboardCard";
import ChartCard from "../components/ChartCard";

import "bootstrap/dist/css/bootstrap.min.css";

function Dashboard() {
  return (
  <div className="d-flex">

    <Sidebar />

    <div className="flex-grow-1">

      <Navbar />

      <div className="container-fluid p-4">

        <h2 className="fw-bold mb-4">
          Dashboard
        </h2>

        <div className="row g-4">

          <div className="col-md-3">
            <DashboardCard
              title="Total Vehicles"
              value="24"
            />
          </div>

          <div className="col-md-3">
            <DashboardCard
              title="Active Trips"
              value="8"
            />
          </div>

          <div className="col-md-3">
            <DashboardCard
              title="Available Drivers"
              value="16"
            />
          </div>

          <div className="col-md-3">
            <DashboardCard
              title="Maintenance Due"
              value="3"
            />
          </div>

        </div>

        <div className="mt-5">
          <ChartCard />
        </div>

      </div>

    </div>

  </div>
);
}

export default Dashboard;