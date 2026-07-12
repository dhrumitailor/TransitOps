function Driver() {
  return (
    <div className="container-fluid p-4">

      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Driver Management</h2>
          <p className="text-muted mb-0">
            Manage all drivers, licenses and availability.
          </p>
        </div>

        <button className="btn btn-primary">
          + Add Driver
        </button>
      </div>

    </div>
  );
}

export default Driver;