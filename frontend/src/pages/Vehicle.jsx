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

<div className="row mb-4">

  <div className="col-md-4">
    <input
      type="text"
      className="form-control"
      placeholder="Search Vehicle..."
    />
  </div>

  <div className="col-md-3">
    <select className="form-select">
      <option>Vehicle Type</option>
      <option>Truck</option>
      <option>Van</option>
      <option>Pickup</option>
    </select>
  </div>

  <div className="col-md-3">
    <select className="form-select">
      <option>Status</option>
      <option>Available</option>
      <option>On Trip</option>
      <option>Maintenance</option>
    </select>
  </div>

  <div className="col-md-2">
    <button className="btn btn-primary w-100">
      Search
    </button>
  </div>

</div>

  <div className="row mb-4">

  <div className="col-md-4">
    <div className="card shadow-sm border-start border-success border-4">
      <div className="card-body">
        <h6>Total Vehicles</h6>
        <h3>24</h3>
      </div>
    </div>
  </div>

  <div className="col-md-4">
    <div className="card shadow-sm border-start border-warning border-4">
      <div className="card-body">
        <h6>On Trip</h6>
        <h3>8</h3>
      </div>
    </div>
  </div>

  <div className="col-md-4">
    <div className="card shadow-sm border-start border-danger border-4">
      <div className="card-body">
        <h6>Maintenance</h6>
        <h3>3</h3>
      </div>
    </div>
  </div>

</div>   

<div className="row mb-4">

  <div className="col-md-4">
    <div className="card shadow-sm border-start border-primary border-4">
      <div className="card-body">
        <h6>Total Vehicles</h6>
        <h3>53</h3>
      </div>
    </div>
  </div>

  <div className="col-md-4">
    <div className="card shadow-sm border-start border-success border-4">
      <div className="card-body">
        <h6>Available</h6>
        <h3>42</h3>
      </div>
    </div>
  </div>

  <div className="col-md-4">
    <div className="card shadow-sm border-start border-danger border-4">
      <div className="card-body">
        <h6>Maintenance</h6>
        <h3>5</h3>
      </div>
    </div>
  </div>

</div>

<table className="table table-hover align-middle">

  <thead className="table-dark">
    <tr>
      <th>ID</th>
      <th>Registration No.</th>
      <th>Vehicle</th>
      <th>Driver</th>
      <th>Capacity</th>
      <th>Status</th>
    </tr>
  </thead>

  <tbody>

    <tr>
      <td>V001</td>
      <td>GJ01AB1234</td>
      <td>Tata Ace</td>
      <td>Rahul Patel</td>
      <td>1.5 Ton</td>
      <td>
        <span className="badge bg-success">
          Available
        </span>
      </td>
    </tr>

    <tr>
      <td>V002</td>
      <td>GJ05CD5678</td>
      <td>Ashok Leyland</td>
      <td>Amit Shah</td>
      <td>10 Ton</td>
      <td>
        <span className="badge bg-warning text-dark">
          On Trip
        </span>
      </td>
    </tr>

    <tr>
      <td>V003</td>
      <td>GJ18EF9012</td>
      <td>Mahindra Pickup</td>
      <td>Neha Joshi</td>
      <td>2 Ton</td>
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