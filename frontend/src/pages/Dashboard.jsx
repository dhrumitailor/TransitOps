import "bootstrap/dist/css/bootstrap.min.css";

function Dashboard() {
  return (
    <div className="container-fluid p-4">
      <h2 className="fw-bold mb-4">Dashboard</h2>

      <div className="row g-4">

        <div className="col-md-3">
          <div className="card shadow-sm p-3">
            <h6>Total Vehicles</h6>
            <h2>24</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm p-3">
            <h6>Active Trips</h6>
            <h2>8</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm p-3">
            <h6>Drivers Available</h6>
            <h2>16</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm p-3">
            <h6>Maintenance</h6>
            <h2>3</h2>
          </div>
        </div>

      </div>

      <div className="card shadow-sm mt-5 p-4">
        <h4>Fleet Overview</h4>
        <p className="text-muted">
          Dashboard charts and analytics will appear here.
        </p>
      </div>

    </div>
  );
}

export default Dashboard;