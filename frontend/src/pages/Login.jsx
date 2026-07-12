import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
    const navigate = useNavigate();
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
          />
        </div>

        <div className="mb-3">
  <label className="form-label">Role</label>

  <select className="form-select">
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
          />
        </div>

        <div className="text-center mt-3">
  <a href="#">Forgot Password?</a>
</div>

        <button
  className="btn btn-primary w-100"
  onClick={() => navigate("/dashboard")}
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