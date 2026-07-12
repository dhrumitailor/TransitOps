import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import { useEffect, useState } from "react";

import {
  getExpenses,
  addExpense,
  deleteExpense,
} from "../services/expenseService";

function Expense() {
  const [search, setSearch] = useState("");
  const [expenses, setExpenses] = useState([]);

const [showModal, setShowModal] = useState(false);

const [expenseForm, setExpenseForm] = useState({
  vehicle_id: "",
  trip_id: "",
  category: "",
  description: "",
  amount: "",
  expense_date: "",
});
useEffect(() => {
  loadExpenses();
}, []);

async function loadExpenses() {
  try {
    const response = await getExpenses();
    setExpenses(response);
  } catch (error) {
    console.error(error);
  }
}

  const columns = [
    "Expense Type",
    "Vehicle",
    "Amount",
    "Date",
    "Status",
    "Actions",
  ];

  const data = expenses.map((item) => [
  item.vehicle_id,
  item.category,
  item.description,
  `₹${item.amount}`,
  item.expense_date,

  <>
    <button
      className="btn btn-outline-danger btn-sm"
      onClick={() => handleDeleteExpense(item.id)}
    >
      Delete
    </button>
  </>,
]);
async function handleAddExpense() {
  try {
    await addExpense(expenseForm);

    setShowModal(false);

    setExpenseForm({
      vehicle_id: "",
      trip_id: "",
      category: "",
      description: "",
      amount: "",
      expense_date: "",
    });

    loadExpenses();
  } catch (error) {
    console.error(error);
    alert("Failed to add expense.");
  }
}
async function handleDeleteExpense(id) {
  if (!window.confirm("Delete this expense?")) return;

  try {
    await deleteExpense(id);
    loadExpenses();
  } catch (error) {
    console.error(error);
  }
}

  const filteredData = data.filter((expense) =>
    expense[0].toLowerCase().includes(search.toLowerCase())
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
            Expense Management
          </h2>

          <p className="text-muted">
            Manage operational expenses.
          </p>
        </div>

        <button
  className="btn btn-primary"
  onClick={() => setShowModal(true)}
>
  + Add Expense
</button>

      </div>

      <div className="card shadow border-0 rounded-4">

        <div className="card-body">

          <SearchBar
            placeholder="Search Expenses..."
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
          <h5>Add Expense</h5>

          <button
            className="btn-close"
            onClick={() => setShowModal(false)}
          />
        </div>

        <div className="modal-body">

          <input
            className="form-control mb-2"
            placeholder="Vehicle ID"
            value={expenseForm.vehicle_id}
            onChange={(e) =>
              setExpenseForm({
                ...expenseForm,
                vehicle_id: e.target.value,
              })
            }
          />

          <input
            className="form-control mb-2"
            placeholder="Trip ID"
            value={expenseForm.trip_id}
            onChange={(e) =>
              setExpenseForm({
                ...expenseForm,
                trip_id: e.target.value,
              })
            }
          />

          <input
            className="form-control mb-2"
            placeholder="Category"
            value={expenseForm.category}
            onChange={(e) =>
              setExpenseForm({
                ...expenseForm,
                category: e.target.value,
              })
            }
          />

          <textarea
            className="form-control mb-2"
            placeholder="Description"
            value={expenseForm.description}
            onChange={(e) =>
              setExpenseForm({
                ...expenseForm,
                description: e.target.value,
              })
            }
          />

          <input
            className="form-control mb-2"
            placeholder="Amount"
            value={expenseForm.amount}
            onChange={(e) =>
              setExpenseForm({
                ...expenseForm,
                amount: e.target.value,
              })
            }
          />

          <input
            type="date"
            className="form-control"
            value={expenseForm.expense_date}
            onChange={(e) =>
              setExpenseForm({
                ...expenseForm,
                expense_date: e.target.value,
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
            onClick={handleAddExpense}
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

export default Expense;