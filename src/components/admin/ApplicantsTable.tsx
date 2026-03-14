import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

interface Applicant {
  id: string;
  name: string;
  email: string;
  role: string;
  message: string;
  resume: string;
  created_at: string;
}

interface ApplicantsTableProps {
  roleName: string | null;
  limit?: number;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const ApplicantsTable: React.FC<ApplicantsTableProps> = ({ roleName, limit, searchQuery, onSearchChange }) => {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState<string>("All Roles");
  const [previewMessage, setPreviewMessage] = useState<string | null>(null);

  const availableRoles = [
    "All Roles",
    "AI / ML Developer",
    "Full Stack Web Developer",
    "HR Manager",
    "iOS Developer (Swift)"
  ];

  useEffect(() => {
    fetchApplicants();
  }, [roleName]);

  const fetchApplicants = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from("applications")
        .select("*")
        .order("created_at", { ascending: false });

      if (roleName) {
        query = query.eq("role", roleName);
      }

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (error) throw error;
      setApplicants(data || []);
    } catch (error) {
      console.error("Error fetching applicants:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewResume = (resumePath: string) => {
    if (!resumePath) {
      alert("Resume not available");
      return;
    }

    try {
      const { data } = supabase.storage
        .from("resumes")
        .getPublicUrl(resumePath);

      if (data?.publicUrl) {
        window.open(data.publicUrl, "_blank");
      } else {
        alert("Could not generate resume link");
      }
    } catch (error) {
      console.error("Error opening resume:", error);
      alert("Error opening resume");
    }
  };

  const handleDownloadResume = async (resumePath: string, applicantName: string) => {
    if (!resumePath) {
      alert("Resume not available");
      return;
    }

    try {
        const { data, error } = await supabase.storage
          .from("resumes")
          .download(resumePath);
        
        if (error) throw error;

        // Create a download link
        const url = URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${applicantName.replace(/\s+/g, '_')}_Resume`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading resume:", error);
      alert("Error downloading resume");
    }
  };

  const truncateMessage = (message: string) => {
    if (!message) return "---";
    const words = message.split(" ");
    if (words.length <= 9) return message;
    return words.slice(0, 9).join(" ") + "...";
  };

  const filteredApplicants = applicants.filter(app => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = app.name.toLowerCase().includes(q) || app.email.toLowerCase().includes(q);
    const matchesRole = selectedRole === "All Roles" || app.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  if (loading) {
    return (
      <div className="admin-card min-h-[400px] flex flex-col items-center justify-center bg-white border border-gray-200 mt-6 shadow-sm">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-500 font-bold text-sm tracking-tight">Fetching Candidate Records...</p>
      </div>
    );
  }

  return (
    <>
      <div className="table-card">
        {/* Table Controls Panel (Glass Effect) */}
        <div className="table-controls-panel shadow-sm">
        <div className="flex-1 max-w-[320px]">
            <div className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-2 px-1">Search Candidates</div>
            <input 
                type="text"
                placeholder="Search applicants by name or email"
                className="search-bar w-full"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
            />
        </div>
        
        <div>
            <div className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-2 px-1 text-right">Filter by Role</div>
            <select 
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="role-select shadow-sm"
            >
                {availableRoles.map(role => (
                    <option key={role} value={role}>{role}</option>
                ))}
            </select>
        </div>
      </div>

      <div className="admin-table-container">
        <div className="overflow-x-auto text-left">
          <table className="admin-table">
            <thead>
              <tr>
                <th className="font-bold">Applicant Name</th>
                <th className="font-bold">Email Address</th>
                <th className="font-bold">Target Role</th>
                <th className="font-bold">Message Preview</th>
                <th className="font-bold text-right">Resume Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplicants.map((item) => (
                <tr key={item.id} className="transition-all">
                  <td className="font-bold text-gray-900 py-4">
                      <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center p-0.5 shadow-sm overflow-hidden">
                              <img 
                                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=f8fafc&color=1e293b&bold=true`} 
                                  className="w-full h-full rounded-lg object-cover"
                                  alt=""
                              />
                          </div>
                          <div className="flex flex-col">
                              <span>{item.name}</span>
                              <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">{new Date(item.created_at).toLocaleDateString()}</span>
                          </div>
                      </div>
                  </td>
                  <td className="text-sm font-medium text-gray-600">{item.email}</td>
                  <td className="text-sm">
                      <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border border-blue-100/50">
                          {item.role}
                      </span>
                  </td>
                  <td className="max-w-[250px]">
                    <p 
                        className="text-sm cursor-pointer hover:text-blue-600 transition-colors font-medium text-gray-500" 
                        title="Click to view full message"
                        onClick={() => setPreviewMessage(item.message)}
                    >
                        {truncateMessage(item.message)}
                    </p>
                  </td>
                  <td className="text-right">
                    <div className="resume-actions-cell">
                        <button
                            onClick={() => handleViewResume(item.resume)}
                            className="btn-view-outline"
                        >
                            View
                        </button>
                        <button
                            onClick={() => handleDownloadResume(item.resume, item.name)}
                            className="btn-download-filled"
                        >
                            Download
                        </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredApplicants.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-24 text-center text-gray-400 italic font-semibold">
                    No results found for your search or filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      </div>

      {/* Message Preview Modal */}
      {previewMessage && (
        <div className="message-modal-overlay" onClick={() => setPreviewMessage(null)}>
            <div className="message-modal" onClick={(e) => e.stopPropagation()}>
                <div className="message-modal-close" onClick={() => setPreviewMessage(null)}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 pr-10">Application Message</h3>
                <div className="max-h-[60vh] overflow-y-auto pr-2">
                    <p className="message-text">{previewMessage}</p>
                </div>
                <div className="mt-8 flex justify-end">
                    <button 
                        onClick={() => setPreviewMessage(null)}
                        className="px-6 py-2 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all hover:scale-105"
                    >
                        Got it
                    </button>
                </div>
            </div>
        </div>
      )}
    </>
  );
};

export default ApplicantsTable;
