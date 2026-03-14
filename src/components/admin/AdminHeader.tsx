import React from "react";
import { useNavigate } from "react-router-dom";

interface AdminHeaderProps {
  title: string;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ title }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin");
  };

  return (
    <header className="admin-header">
      <div>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">{title}</h1>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 pr-4 border-r border-gray-100 hidden sm:flex">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span className="text-sm text-gray-600 font-semibold">Administrator</span>
        </div>
        <button
          onClick={handleLogout}
          className="logout-button shadow-sm"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
