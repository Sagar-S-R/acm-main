'use client';

import { useState, useEffect } from 'react';
import { apiCall, API_ENDPOINTS } from '@/lib/api';
import { useRouter } from 'next/navigation';

interface TeamStats {
  team: string;
  memberCount: number;
}

interface TeamDetail {
  team: string;
  members: Array<{
    name: string;
    email: string;
    role: string;
    isLead: boolean;
  }>;
  memberCount: number;
}

export default function TeamStats() {
  const router = useRouter();
  const [stats, setStats] = useState<TeamStats[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<TeamDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await apiCall(API_ENDPOINTS.TEAMS_STATS);

      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTeamClick = async (teamName: string) => {
    const token = localStorage.getItem('token');
    try {
      const response = await apiCall(`${API_ENDPOINTS.TEAMS}/${encodeURIComponent(teamName)}`);

      if (response.ok) {
        const data = await response.json();
        setSelectedTeam(data);
      }
    } catch (error) {
      console.error('Error fetching team details:', error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Team Statistics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {loading ? (
          <div className="text-center text-gray-600 col-span-full">Loading statistics...</div>
        ) : (
          stats.map((team) => (
            <div
              key={team.team}
              onClick={() => handleTeamClick(team.team)}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg cursor-pointer transition"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">{team.team}</h3>
              <div className="text-4xl font-bold text-blue-600 mb-2">{team.memberCount}</div>
              <p className="text-gray-600">Active Members</p>
            </div>
          ))
        )}
      </div>

      {selectedTeam && (
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">{selectedTeam.team} Members</h2>
            <button
              onClick={() => setSelectedTeam(null)}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
            >
              Close
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Role</th>
                  <th className="px-6 py-3 text-left">Team Lead</th>
                </tr>
              </thead>
              <tbody>
                {selectedTeam.members.map((member, idx) => (
                  <tr key={idx} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-3">{member.name}</td>
                    <td className="px-6 py-3">{member.email}</td>
                    <td className="px-6 py-3 capitalize">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                        {member.role}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      {member.isLead ? (
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                          Lead
                        </span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
