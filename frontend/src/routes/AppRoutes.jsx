import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Vehicle from "../pages/Vehicle";

// Friend's pages
import Driver from "../pages/Driver";
import Trip from "../pages/Trip";
import Maintenance from "../pages/Maintenance";
import Fuel from "../pages/Fuel";
import Expense from "../pages/Expense";
import Reports from "../pages/Reports";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/vehicles" element={<Vehicle />} />

        <Route path="/drivers" element={<Driver />} />

        <Route path="/trips" element={<Trip />} />

        <Route path="/maintenance" element={<Maintenance />} />

        <Route path="/fuel" element={<Fuel />} />

        <Route path="/expenses" element={<Expense />} />

        <Route path="/reports" element={<Reports />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;