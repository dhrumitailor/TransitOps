import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      className="bg-dark text-white p-3"
      style={{
        width: "240px",
        minHeight: "100vh",
      }}
    >
      <h3 className="mb-4">🚚 TransitOps</h3>

      <ul className="nav flex-column">

        <li className="nav-item mb-3">
          <Link className="nav-link text-white" to="/dashboard">
            Dashboard
          </Link>
        </li>

        <li className="nav-item mb-3">
          <Link className="nav-link text-white" to="/vehicles">
            Vehicles
          </Link>
        </li>

        <li className="nav-item mb-3">
          <Link className="nav-link text-white" to="/drivers">
            Drivers
          </Link>
        </li>

        <li className="nav-item mb-3">
          <Link className="nav-link text-white" to="/trips">
            Trips
          </Link>
        </li>

        <li className="nav-item mb-3">
          <Link className="nav-link text-white" to="/maintenance">
            Maintenance
          </Link>
        </li>

        <li className="nav-item mb-3">
          <Link className="nav-link text-white" to="/fuel">
            Fuel
          </Link>
        </li>

        <li className="nav-item mb-3">
          <Link className="nav-link text-white" to="/expenses">
            Expenses
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link text-white" to="/reports">
            Reports
          </Link>
        </li>

      </ul>
    </div>
  );
}

export default Sidebar;