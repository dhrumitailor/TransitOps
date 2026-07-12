import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import {
  getTrips,
  addTrip,
  updateTrip,
  deleteTrip,
} from "../services/tripService";
function Trip() {
  const [search, setSearch] = useState("");
  const [trips, setTrips] = useState([]);
  const [showModal, setShowModal] = useState(false);
const [editingTripId, setEditingTripId] = useState(null);

const [tripForm, setTripForm] = useState({
  vehicle_id: "",
  driver_id: "",
  source: "",
  destination: "",
  cargo_weight: "",
  planned_distance: "",
  revenue: "",
  remarks: "",
});
  useEffect(() => {
  loadTrips();
}, []);

async function loadTrips() {
  try {
    const response = await getTrips();
    console.log(response);
    setTrips(response);
  } catch (error) {
    console.error(error);
  }
}
async function handleSaveTrip() {
  try {
    if (editingTripId) {
      await updateTrip(editingTripId, tripForm);
    } else {
      await addTrip(tripForm);
    }

    loadTrips();

    setShowModal(false);
    setEditingTripId(null);

    setTripForm({
      vehicle_id: "",
      driver_id: "",
      source: "",
      destination: "",
      cargo_weight: "",
      planned_distance: "",
      revenue: "",
      remarks: "",
    });

  } catch (error) {
    console.error(error);
    alert("Failed to save trip");
  }
}
function handleEditTrip(trip) {
  setEditingTripId(trip.id);

  setTripForm({
    vehicle_id: trip.vehicle_id,
    driver_id: trip.driver_id,
    source: trip.source,
    destination: trip.destination,
    cargo_weight: trip.cargo_weight,
    planned_distance: trip.planned_distance,
    revenue: trip.revenue,
    remarks: trip.remarks,
  });

  setShowModal(true);
}
async function handleDeleteTrip(id) {
  if (!window.confirm("Delete this trip?")) return;

  try {
    await deleteTrip(id);
    loadTrips();
  } catch (error) {
    console.error(error);
  }
}

  const columns = [
    "Source",
    "Destination",
    "Vehicle",
    "Driver",
    "Cargo (kg)",
    "Status",
    "Actions",
  ];

const data = trips.map((trip) => [
  trip.source,
  trip.destination,
  trip.vehicle_id,
  trip.driver_id,
  trip.cargo_weight,

  <span className="badge bg-primary">
    {trip.status}
  </span>,

  <>
    <button
    className="btn btn-warning btn-sm me-2"
    onClick={() => handleEditTrip(trip)}
>
    Edit
</button>

    <button
    className="btn btn-danger btn-sm"
    onClick={() => handleDeleteTrip(trip.id)}
>
    Delete
</button>
  </>,
]);

  const filteredData = data.filter((trip) =>
    trip[0].toLowerCase().includes(search.toLowerCase())
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
            Trip Management
          </h2>

          <p className="text-muted">
            Manage transport trips and dispatch operations.
          </p>
        </div>

        <button
  className="btn btn-primary px-4"
  onClick={() => setShowModal(true)}
>
  + Create Trip
</button>

      </div>

      {/* Card */}
      <div className="card shadow border-0 rounded-4">

        <div className="card-body">

          <SearchBar
            placeholder="Search Trips..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Table
            columns={columns}
            data={filteredData}
          />

        </div>

      </div>
    </div>
    </div>
    {showModal && (
<div className="modal d-block" style={{background:"rgba(0,0,0,.5)"}}>
<div className="modal-dialog">
<div className="modal-content">

<div className="modal-header">
<h5>{editingTripId ? "Edit Trip" : "Create Trip"}</h5>

<button
className="btn-close"
onClick={()=>setShowModal(false)}
/>

</div>

<div className="modal-body">

<input
className="form-control mb-2"
placeholder="Vehicle ID"
value={tripForm.vehicle_id}
onChange={(e)=>setTripForm({...tripForm,vehicle_id:e.target.value})}
/>

<input
className="form-control mb-2"
placeholder="Driver ID"
value={tripForm.driver_id}
onChange={(e)=>setTripForm({...tripForm,driver_id:e.target.value})}
/>

<input
className="form-control mb-2"
placeholder="Source"
value={tripForm.source}
onChange={(e)=>setTripForm({...tripForm,source:e.target.value})}
/>

<input
className="form-control mb-2"
placeholder="Destination"
value={tripForm.destination}
onChange={(e)=>setTripForm({...tripForm,destination:e.target.value})}
/>

<input
className="form-control mb-2"
placeholder="Cargo Weight"
value={tripForm.cargo_weight}
onChange={(e)=>setTripForm({...tripForm,cargo_weight:e.target.value})}
/>

<input
className="form-control mb-2"
placeholder="Planned Distance"
value={tripForm.planned_distance}
onChange={(e)=>setTripForm({...tripForm,planned_distance:e.target.value})}
/>

<input
className="form-control mb-2"
placeholder="Revenue"
value={tripForm.revenue}
onChange={(e)=>setTripForm({...tripForm,revenue:e.target.value})}
/>

<textarea
className="form-control"
placeholder="Remarks"
value={tripForm.remarks}
onChange={(e)=>setTripForm({...tripForm,remarks:e.target.value})}
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
onClick={handleSaveTrip}
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

export default Trip;