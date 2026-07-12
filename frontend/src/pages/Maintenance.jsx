import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import {
  getMaintenance,
  addMaintenance,
  updateMaintenance,
  deleteMaintenance,
} from "../services/maintenanceService";
function Maintenance() {
  const [search, setSearch] = useState("");
  const [maintenance, setMaintenance] = useState([]);

const [showModal, setShowModal] = useState(false);
const [editingMaintenanceId, setEditingMaintenanceId] = useState(null);

const [maintenanceForm, setMaintenanceForm] = useState({
  vehicle_id: "",
  maintenance_type: "",
  description: "",
  service_date: "",
  cost: "",
});
useEffect(() => {
  loadMaintenance();
}, []);

async function loadMaintenance() {
  try {
    const response = await getMaintenance();

    // Change this if your API returns { items: [...] }
    setMaintenance(response.items);

  } catch (error) {
    console.error(error);
  }
}
async function handleAddMaintenance() {
  try {

    const data = {
      vehicle_id: Number(maintenanceForm.vehicle_id),
      maintenance_type: maintenanceForm.maintenance_type,
      description: maintenanceForm.description,
      service_date: maintenanceForm.service_date,
      cost: Number(maintenanceForm.cost),
    };

    await addMaintenance(data);

    setShowModal(false);

    setMaintenanceForm({
      vehicle_id: "",
      maintenance_type: "",
      description: "",
      service_date: "",
      cost: "",
    });

    loadMaintenance();

  } catch(error) {
    console.error(error);
    alert("Failed to add maintenance");
  }
}

  const columns = [
    "Vehicle",
    "Maintenance Type",
    "Date",
    "Cost",
    "Status",
    "Actions",
  ];

  const data = maintenance.map((item) => [
  item.vehicle_id,
  item.maintenance_type,
  item.service_date,
  `₹${item.cost}`,

  <span className="badge bg-success">
    Completed
  </span>,

  <>
    <button
      className="btn btn-outline-primary btn-sm me-2"
    >
      Edit
    </button>

    <button
      className="btn btn-outline-danger btn-sm"
    >
      Delete
    </button>
  </>,
]);

  const filteredData = data.filter((maintenance) =>
    String(maintenance[0]).toLowerCase().includes(search.toLowerCase())
  );

    return (
  <div className="d-flex">

    <Sidebar />

    <div className="flex-grow-1">

      <Navbar />

      <div className="container-fluid p-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="fw-bold mb-1">
            Maintenance Management
          </h2>

          <p className="text-muted">
            Manage vehicle maintenance records.
          </p>
        </div>

<button
  className="btn btn-primary px-4"
  onClick={() => setShowModal(true)}
>          + Add Maintenance
        </button>

      </div>

      <div className="card shadow border-0 rounded-4">

        <div className="card-body">

          <SearchBar
            placeholder="Search Maintenance..."
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
<div className="modal d-block" style={{background:"rgba(0,0,0,.5)"}}>
<div className="modal-dialog">
<div className="modal-content">

<div className="modal-header">
<h5>Add Maintenance</h5>

<button
className="btn-close"
onClick={()=>setShowModal(false)}
/>

</div>


<div className="modal-body">

<input
className="form-control mb-2"
placeholder="Vehicle ID"
value={maintenanceForm.vehicle_id}
onChange={(e)=>setMaintenanceForm({
...maintenanceForm,
vehicle_id:e.target.value
})}
/>


<input
className="form-control mb-2"
placeholder="Maintenance Type"
value={maintenanceForm.maintenance_type}
onChange={(e)=>setMaintenanceForm({
...maintenanceForm,
maintenance_type:e.target.value
})}
/>


<textarea
className="form-control mb-2"
placeholder="Description"
value={maintenanceForm.description}
onChange={(e)=>setMaintenanceForm({
...maintenanceForm,
description:e.target.value
})}
/>


<input
type="date"
className="form-control mb-2"
value={maintenanceForm.service_date}
onChange={(e)=>setMaintenanceForm({
...maintenanceForm,
service_date:e.target.value
})}
/>


<input
className="form-control"
placeholder="Cost"
value={maintenanceForm.cost}
onChange={(e)=>setMaintenanceForm({
...maintenanceForm,
cost:e.target.value
})}
/>


</div>


<div className="modal-footer">

<button
className="btn btn-secondary"
onClick={()=>setShowModal(false)}
>
Cancel
</button>


<button
className="btn btn-primary"
onClick={handleAddMaintenance}
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

export default Maintenance;