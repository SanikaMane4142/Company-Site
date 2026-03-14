import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import StatsCards from "../components/admin/StatsCards";
import ApplicantsTable from "../components/admin/ApplicantsTable";

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalApplications: 0,
    totalRoles: 0,
    status: "Online",
    database: "Supabase Connected"
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data, error } = await supabase
        .from("applications")
        .select("role");

      if (error) throw error;

      if (data) {
        const uniqueRoles = [...new Set(data.map(item => item.role))].filter(Boolean);
        setStats({
          totalApplications: data.length,
          totalRoles: uniqueRoles.length,
          status: "Online",
          database: "Supabase Connected"
        });
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* 1. Stats Cards at the top */}
      <StatsCards stats={stats} loading={loading} />

      {/* 2. Main Data Section with Integrated Search & Filter - CENTERED */}
      <div className="table-wrapper px-4">
          <ApplicantsTable 
            roleName={null} 
            limit={15} 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
       </div>
    </div>
  );
};

export default AdminDashboard;
