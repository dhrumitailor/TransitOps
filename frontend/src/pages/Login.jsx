import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [role, setRole] = useState("Admin");
const [error, setError] = useState("");

const handleLogin = async () => {
  setError("");

  try {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    const data = response.data;

    if (data.success) {
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard");
    } else {
      setError(data.message);
    }
  } catch (err) {
    setError(
      err.response?.data?.message || "Unable to connect to server."
    );
  }
};

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "#f4f7fc",
      }}
    >
      <div
        className="card shadow-lg p-5"
        style={{
          width: "420px",
          borderRadius: "18px",
        }}
      >
        <h2 className="text-center fw-bold mb-2">TransitOps</h2>

        <p className="text-center text-muted mb-4">
          Smart Transport Operations Platform
        </p>

        <div className="mb-3">
          <label className="form-label">Email</label>

<input
  type="email"
  className="form-control"
  placeholder="Enter email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
        </div>

        <div className="mb-3">
  <label className="form-label">Role</label>

  <select
  className="form-select"
  value={role}
  onChange={(e) => setRole(e.target.value)}
>
    <option>Admin</option>
    <option>Manager</option>
    <option>Driver</option>
  </select>
</div>

        <div className="mb-4">
          <label className="form-label">Password</label>

<input
  type="password"
  className="form-control"
  placeholder="Enter password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>
        </div>

{error && (
  <div className="alert alert-danger">
    {error}
  </div>
)}

        <button
  className="btn btn-primary w-100"
  onClick={handleLogin}
>
  Login
</button>

<div className="text-center mt-3">
  <a href="#">Forgot Password?</a>
</div>

      </div>
    </div>
  );
}

export default Login;