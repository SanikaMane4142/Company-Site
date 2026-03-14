import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/admin.css";

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const envUser = import.meta.env.VITE_ADMIN_USERNAME;
    const envPass = import.meta.env.VITE_ADMIN_PASSWORD;

    if (username === envUser && password === envPass) {
      localStorage.setItem("adminToken", "authenticated");
      navigate("/admin/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="mb-8">
          <h1 className="login-title">
            COC<span className="text-blue-600">PIT</span> ADMIN
          </h1>
          <p className="login-subtitle">Admin Dashboard Access</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-1">
          <div className="login-form-group">
            <label className="login-label">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="login-input"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="login-form-group">
            <label className="login-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 text-[13px] p-3 rounded-lg text-center mb-4 font-medium animate-shake">
              {error}
            </div>
          )}

          <button type="submit" className="login-button shadow-blue-600/10 shadow-lg">
            Sign In
          </button>
        </form>

        <div className="login-footer">
          Authorized access only
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
