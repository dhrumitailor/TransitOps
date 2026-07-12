function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm px-4">
      <div className="container-fluid">
        <span className="navbar-brand fw-bold">
          🚚 TransitOps
        </span>

        <div className="ms-auto">
          <button className="btn btn-outline-primary">
            Admin
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;