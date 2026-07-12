function Sidebar() {
  return (
    <div
      className="bg-dark text-white p-3"
      style={{
        width: "240px",
        minHeight: "100vh",
      }}
    >
      <h3 className="mb-4">TransitOps</h3>

      <ul className="nav flex-column">

        <li className="nav-item mb-3">
          Dashboard
        </li>

        <li className="nav-item mb-3">
          Vehicles
        </li>

        <li className="nav-item mb-3">
          Drivers
        </li>

        <li className="nav-item mb-3">
          Trips
        </li>

        <li className="nav-item">
          Reports
        </li>

      </ul>
    </div>
  );
}

export default Sidebar;