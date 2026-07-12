import "bootstrap/dist/css/bootstrap.min.css";

function Navbar() {
  return (
    <nav className="navbar bg-white shadow-sm px-4">
      <div className="container-fluid">

        <h4 className="fw-bold m-0">
          🚚 TransitOps
        </h4>

        <div className="d-flex align-items-center gap-3">

          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            style={{ width: "220px" }}
          />

          <button className="btn btn-outline-secondary">
            🔔
          </button>

          <button className="btn btn-outline-primary">
            Admin
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;