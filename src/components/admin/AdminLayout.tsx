import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import "../../styles/admin.css";

const AdminLayout: React.FC = () => {
  const location = useLocation();

  const getTitle = () => {
    if (location.pathname === "/admin/dashboard") return "Dashboard Overview";
    if (location.pathname.startsWith("/admin/applications/")) {
        const parts = location.pathname.split("/");
        return decodeURIComponent(parts[parts.length - 1]);
    }
    return "Admin Panel";
  };

  return (
    <div className="admin-layout antialiased min-h-screen">
      <div className="flex-1 flex flex-col min-w-0">
          <AdminHeader title={getTitle()} />
          <main className="p-10 w-full pb-10">
            <Outlet />
          </main>
      </div>
    </div>
  );
};

export default AdminLayout;
