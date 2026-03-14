import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { supabase } from "../../lib/supabase";

const AdminSidebar: React.FC = () => {
  const [rolesWithCounts, setRolesWithCounts] = useState<{ name: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const { data, error } = await supabase
        .from("applications")
        .select("role");

      if (error) throw error;

      if (data) {
        const counts: Record<string, number> = {};
        data.forEach(item => {
          if (item.role) {
            counts[item.role] = (counts[item.role] || 0) + 1;
          }
        });

        const sortedRoles = Object.keys(counts).sort().map(name => ({
          name,
          count: counts[name]
        }));
        
        setRolesWithCounts(sortedRoles);
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className="admin-sidebar hidden lg:flex shadow-sm">
      <div className="mb-10 px-1">
        <Link to="/admin/dashboard" className="text-xl font-bold tracking-tight text-gray-900 no-underline">
          COC<span className="text-blue-600">PIT</span> ADMIN
        </Link>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto">
        <div className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-4 px-1">Applications</div>
        <div className="space-y-1">
           <Link
              to="/admin/dashboard"
              className={`role-item ${location.pathname === "/admin/dashboard" ? "active" : ""}`}
            >
              <span>Dashboard</span>
            </Link>
          {loading ? (
            <div className="text-sm text-gray-400 animate-pulse px-4 mt-4">Loading...</div>
          ) : (
            rolesWithCounts.map((role) => {
              const encodedRole = encodeURIComponent(role.name);
              const isActive = location.pathname.includes(`/admin/applications/${encodedRole}`);
              return (
                <Link
                  key={role.name}
                  to={`/admin/applications/${encodedRole}`}
                  className={`role-item ${isActive ? "active" : ""}`}
                >
                  <span className="truncate mr-2">{role.name}</span>
                  <span className="role-count">{role.count}</span>
                </Link>
              );
            })
          )}
        </div>
      </nav>

      <div className="mt-auto pt-6 border-t border-gray-100">
        <div className="flex items-center gap-3 px-1">
          <div className="w-9 h-9 rounded-lg bg-gray-900 flex items-center justify-center text-[10px] font-bold text-white uppercase tracking-tighter shadow-sm">AD</div>
          <div className="flex flex-col">
            <div className="text-sm font-bold text-gray-900">Administrator</div>
            <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">System Access</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
