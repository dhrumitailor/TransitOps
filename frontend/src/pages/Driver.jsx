import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";

import {
  getDrivers,
  addDriver,
  updateDriver,
  deleteDriver,
} from "../services/driverService";
function Driver() {
  const [search, setSearch] = useState("");
  const [drivers, setDrivers] = useState([]);
  const [editingDriverId, setEditingDriverId] = useState(null);

  const [showModal, setShowModal] = useState(false);

const [driverForm, setDriverForm] = useState({
  name: "",
  license_number: "",
  license_category: "",
  license_expiry: "",
  contact_number: "",
  safety_score: "",
});
useEffect(() => {
  loadDrivers();
}, []);

async function loadDrivers() {
  try {
    const response = await getDrivers();
    setDrivers(response.items);
  } catch (error) {
    console.error(error);
  }
}
async function handleSaveDriver() {
  try {
    if (editingDriverId) {
      await updateDriver(editingDriverId, driverForm);
    } else {
      await addDriver(driverForm);
    }

    setShowModal(false);
    setEditingDriverId(null);

    setDriverForm({
      name: "",
      license_number: "",
      license_category: "",
      license_expiry: "",
      contact_number: "",
      safety_score: "",
    });

    loadDrivers();
  } catch (error) {
    console.error(error);
    alert("Failed to save driver.");
  }
}
async function handleDeleteDriver(id) {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this driver?"
  );

  if (!confirmDelete) return;

  try {
    await deleteDriver(id);
    loadDrivers();
  } catch (error) {
    console.error(error);
    alert("Failed to delete driver.");
  }
}
function handleEditDriver(driver) {
  setEditingDriverId(driver.id);

  setDriverForm({
    name: driver.name,
    license_number: driver.license_number,
    license_category: driver.license_category,
    license_expiry: driver.license_expiry,
    contact_number: driver.contact_number,
    safety_score: driver.safety_score,
  });

  setShowModal(true);
}



  const columns = [
    "Name",
    "License",
    "Contact",
    "Status",
    "Safety",
    "Actions",
  ];

const data = drivers.map((driver) => [
  driver.name,
  driver.license_number,
  driver.contact_number,

  <span
    className={`badge ${
      driver.status === "Available"
        ? "bg-success"
        : driver.status === "On Trip"
        ? "bg-primary"
        : "bg-danger"
    }`}
  >
    {driver.status}
  </span>,

  driver.safety_score,

  <>
    <button
  className="btn btn-warning btn-sm me-2"
  onClick={() => handleEditDriver(driver)}
>
  Edit
</button>

    <button
  className="btn btn-danger btn-sm"
  onClick={() => handleDeleteDriver(driver.id)}
>
  Delete
</button>
  </>,
]);
const filteredData = data.filter((driver) =>
  driver[0].toLowerCase().includes(search.toLowerCase())
);
  return (
 <div className="d-flex">

    <Sidebar />

    <div className="flex-grow-1">

      <Navbar />

      <div className="container-fluid p-4">      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="fw-bold mb-1">
            Driver Management
          </h2>

          <p className="text-muted">
            Manage driver records and license information.
          </p>
        </div>

        <button
  className="btn btn-primary px-4"
  onClick={() => setShowModal(true)}
>
  + Add Driver
</button>

      </div>

      {/* Search */}
      <div className="card shadow-sm border-0">

  <div className="card-body">

    <SearchBar
      placeholder="Search Drivers..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />

    <Table
  columns={columns}
  data={filteredData}
/>

  </div>

</div>
</div></div>
{showModal && (
  <div
    className="modal d-block"
    tabIndex="-1"
    style={{ background: "rgba(0,0,0,0.5)" }}
  >
    <div className="modal-dialog">
      <div className="modal-content">

        <div className="modal-header">
<h5>
  {editingDriverId ? "Edit Driver" : "Add Driver"}
</h5>
          <button
            className="btn-close"
            onClick={() => setShowModal(false)}
          />
        </div>

        <div className="modal-body">

          <input
            className="form-control mb-3"
            placeholder="Name"
            value={driverForm.name}
            onChange={(e) =>
              setDriverForm({
                ...driverForm,
                name: e.target.value,
              })
            }
          />

          <input
            className="form-control mb-3"
            placeholder="License Number"
            value={driverForm.license_number}
            onChange={(e) =>
              setDriverForm({
                ...driverForm,
                license_number: e.target.value,
              })
            }
          />

          <input
            className="form-control mb-3"
            placeholder="License Category"
            value={driverForm.license_category}
            onChange={(e) =>
              setDriverForm({
                ...driverForm,
                license_category: e.target.value,
              })
            }
          />

          <input
            type="date"
            className="form-control mb-3"
            value={driverForm.license_expiry}
            onChange={(e) =>
              setDriverForm({
                ...driverForm,
                license_expiry: e.target.value,
              })
            }
          />

          <input
            className="form-control mb-3"
            placeholder="Contact Number"
            value={driverForm.contact_number}
            onChange={(e) =>
              setDriverForm({
                ...driverForm,
                contact_number: e.target.value,
              })
            }
          />

          <input
            type="number"
            className="form-control"
            placeholder="Safety Score"
            value={driverForm.safety_score}
            onChange={(e) =>
              setDriverForm({
                ...driverForm,
                safety_score: e.target.value,
              })
            }
          />

        </div>

        <div className="modal-footer">

          <button
            className="btn btn-secondary"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>

          <button
            className="btn btn-primary"
            onClick={handleSaveDriver}
          >
            Save
          </button>

        </div>

      </div>
    </div>
  </div>
)}
    </div>
  );
}

export default Driver;