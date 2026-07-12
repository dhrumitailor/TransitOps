import "bootstrap/dist/css/bootstrap.min.css";

function Vehicle() {
  return (
    <div className="container-fluid p-4">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Vehicle Management</h2>

        <button className="btn btn-primary">
          + Add Vehicle
        </button>
      </div>

      <table className="table table-striped table-hover">

        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Vehicle</th>
            <th>Number</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          <tr>
            <td>1</td>
            <td>Tata Truck</td>
            <td>GJ01AB1234</td>
            <td>
              <span className="badge bg-success">
                Available
              </span>
            </td>
          </tr>

          <tr>
            <td>2</td>
            <td>Ashok Leyland</td>
            <td>GJ05CD6789</td>
            <td>
              <span className="badge bg-warning text-dark">
                On Trip
              </span>
            </td>
          </tr>

        </tbody>

      </table>

    </div>
  );
}

export default Vehicle;