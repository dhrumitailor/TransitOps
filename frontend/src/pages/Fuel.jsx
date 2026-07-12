import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import {
  getFuel,
  addFuel,
  deleteFuel,
} from "../services/fuelService";
function Fuel() {
  const [search, setSearch] = useState("");
  const [fuel, setFuel] = useState([]);

const [showModal, setShowModal] = useState(false);

const [fuelForm, setFuelForm] = useState({
  vehicle_id: "",
  trip_id: "",
  fuel_date: "",
  liters: "",
  price_per_liter: "",
  cost: "",
  odometer: "",
  fuel_station: "",
});
useEffect(() => {
  loadFuel();
}, []);

async function loadFuel() {
  try {
    const response = await getFuel();
    setFuel(response); // change to response.items only if your API returns {items:[]}
  } catch (error) {
    console.error(error);
  }
}

  const columns = [
    "Vehicle",
    "Fuel (Liters)",
    "Cost",
    "Date",
    "Mileage",
    "Actions",
  ];

  const data = fuel.map((item) => [
  item.vehicle_id,
  `${item.liters} L`,
  `₹${item.cost}`,
  item.fuel_date,
  item.odometer,

  <>
    <button
      className="btn btn-outline-danger btn-sm"
      onClick={() => handleDeleteFuel(item.id)}
    >
      Delete
    </button>
  </>,
]);
async function handleAddFuel() {
  try {
    await addFuel(fuelForm);

    setShowModal(false);

    setFuelForm({
      vehicle_id: "",
      trip_id: "",
      fuel_date: "",
      liters: "",
      price_per_liter: "",
      cost: "",
      odometer: "",
      fuel_station: "",
    });

    loadFuel();
  } catch (error) {
    console.error(error);
    alert("Failed to add fuel log");
  }
}
async function handleDeleteFuel(id) {
  if (!window.confirm("Delete this fuel log?")) return;

  try {
    await deleteFuel(id);
    loadFuel();
  } catch (error) {
    console.error(error);
  }
}
  const filteredData = data.filter((fuel) =>
    fuel[0].toLowerCase().includes(search.toLowerCase())
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
            Fuel Management
          </h2>

          <p className="text-muted">
            Manage fuel logs and consumption records.
          </p>
        </div>

<button
  className="btn btn-primary px-4"
  onClick={() => setShowModal(true)}
>          + Add Fuel Log
        </button>

      </div>

      <div className="card shadow border-0 rounded-4">

        <div className="card-body">

          <SearchBar
            placeholder="Search Fuel Logs..."
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
  <div className="modal d-block" style={{ background: "rgba(0,0,0,.5)" }}>
    <div className="modal-dialog">
      <div className="modal-content">

        <div className="modal-header">
          <h5>Add Fuel Log</h5>
          <button
            className="btn-close"
            onClick={() => setShowModal(false)}
          />
        </div>

        <div className="modal-body">

          <input
            className="form-control mb-2"
            placeholder="Vehicle ID"
            value={fuelForm.vehicle_id}
            onChange={(e) =>
              setFuelForm({ ...fuelForm, vehicle_id: e.target.value })
            }
          />

          <input
            className="form-control mb-2"
            placeholder="Trip ID"
            value={fuelForm.trip_id}
            onChange={(e) =>
              setFuelForm({ ...fuelForm, trip_id: e.target.value })
            }
          />

          <input
            type="date"
            className="form-control mb-2"
            value={fuelForm.fuel_date}
            onChange={(e) =>
              setFuelForm({ ...fuelForm, fuel_date: e.target.value })
            }
          />

          <input
            className="form-control mb-2"
            placeholder="Liters"
            value={fuelForm.liters}
            onChange={(e) =>
              setFuelForm({ ...fuelForm, liters: e.target.value })
            }
          />

          <input
            className="form-control mb-2"
            placeholder="Price Per Liter"
            value={fuelForm.price_per_liter}
            onChange={(e) =>
              setFuelForm({ ...fuelForm, price_per_liter: e.target.value })
            }
          />

          <input
            className="form-control mb-2"
            placeholder="Cost"
            value={fuelForm.cost}
            onChange={(e) =>
              setFuelForm({ ...fuelForm, cost: e.target.value })
            }
          />

          <input
            className="form-control mb-2"
            placeholder="Odometer"
            value={fuelForm.odometer}
            onChange={(e) =>
              setFuelForm({ ...fuelForm, odometer: e.target.value })
            }
          />

          <input
            className="form-control"
            placeholder="Fuel Station"
            value={fuelForm.fuel_station}
            onChange={(e) =>
              setFuelForm({ ...fuelForm, fuel_station: e.target.value })
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
            onClick={handleAddFuel}
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

export default Fuel;