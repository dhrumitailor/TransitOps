import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Vehicle() {
  return (
    <div className="d-flex">
      <Sidebar />

      <div className="flex-grow-1">
        <Navbar />

        <div className="container-fluid p-4">

          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold">Vehicle Management</h2>

            <button className="btn btn-primary">
              + Add Vehicle
            </button>
          </div>

          <div className="card shadow-sm p-4">

            <div className="row mb-3">

              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Vehicle"
                />
              </div>

            </div>

            <table className="table table-hover">

              <thead>

                <tr>
                  <th>ID</th>
                  <th>Vehicle</th>
                  <th>Model</th>
                  <th>Status</th>
                </tr>

              </thead>

              <tbody>

                <tr>
                  <td>V001</td>
                  <td>Tata Ace</td>
                  <td>2024</td>
                  <td>
                    <span className="badge bg-success">
                      Available
                    </span>
                  </td>
                </tr>

                <tr>
                  <td>V002</td>
                  <td>Ashok Leyland</td>
                  <td>2023</td>
                  <td>
                    <span className="badge bg-warning text-dark">
                      On Trip
                    </span>
                  </td>
                </tr>

                <tr>
                  <td>V003</td>
                  <td>Mahindra Pickup</td>
                  <td>2022</td>
                  <td>
                    <span className="badge bg-danger">
                      Maintenance
                    </span>
                  </td>
                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Vehicle;