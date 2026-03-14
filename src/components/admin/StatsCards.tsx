import React from "react";

interface StatsCardsProps {
  stats: {
    totalApplications: number;
    totalRoles: number;
    status: string;
    database: string;
  };
  loading: boolean;
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats, loading }) => {
  const cards = [
    { 
      label: "Total Applications", 
      value: stats.totalApplications, 
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    { 
      label: "Total Roles", 
      value: stats.totalRoles, 
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    { 
      label: "System Status", 
      value: stats.status, 
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    { 
      label: "Database Connection", 
      value: stats.database || "Online", 
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      )
    }
  ];

  return (
    <div className="stats-grid">
      {cards.map((card, idx) => (
        <div key={idx} className="admin-card">
          <div className="stat-card-top">
            <div className="stat-card-icon-container">
                {card.icon}
            </div>
            <div className="stat-label">{card.label}</div>
          </div>
          <div className="stat-number">
            {loading ? (
              <div className="h-9 w-20 bg-gray-100 animate-pulse rounded-lg"></div>
            ) : (
              card.value
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
