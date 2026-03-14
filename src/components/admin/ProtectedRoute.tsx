import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute: React.FC = () => {
  const adminToken = localStorage.getItem("adminToken");

  if (!adminToken) {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
