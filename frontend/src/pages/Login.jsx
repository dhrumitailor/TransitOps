import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
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

        <div className="mb-4">
          <label className="form-label">Password</label>

          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
          />
        </div>

        <button className="btn btn-primary w-100">
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;