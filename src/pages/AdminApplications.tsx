import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ApplicantsTable from "../components/admin/ApplicantsTable";

const AdminApplications: React.FC = () => {
  const { roleName } = useParams<{ roleName: string }>();
  const [searchQuery, setSearchQuery] = useState("");

  const decodedRole = roleName ? decodeURIComponent(roleName) : "Role Applications";

  return (
    <div className="w-full">
      <div className="table-wrapper px-4 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight leading-none uppercase mb-2">
              {decodedRole}
          </h2>
          <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Department Recruitment
              </p>
          </div>
      </div>

      <div className="table-wrapper px-4 w-full">
        {roleName ? (
            <ApplicantsTable 
                roleName={decodeURIComponent(roleName)} 
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
            />
        ) : (
            <div className="admin-card py-40 text-center border-dashed border-gray-300 flex flex-col items-center gap-4 bg-white">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-3xl">📁</div>
                <p className="text-gray-400 font-bold text-lg opacity-60">Please select a role from the sidebar to view candidate records.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default AdminApplications;
