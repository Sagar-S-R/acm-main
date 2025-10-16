'use client';

import { useEffect, useState } from 'react';
import { apiCall, API_ENDPOINTS } from '@/lib/api';
import { useRouter } from 'next/navigation';

interface UserData {
  _id: string;
  name: string;
  email: string;
  team: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const response = await apiCall(API_ENDPOINTS.GET_ME);

        if (!response.ok) {
          router.push('/login');
          return;
        }

        const data = await response.json();
        setUserData(data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl font-bold text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl font-bold text-gray-600">Error loading user data</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Welcome, {userData.name}!</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* User Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Profile</h2>
          <p className="text-gray-600 mb-2">
            <strong>Email:</strong> {userData.email}
          </p>
          <p className="text-gray-600">
            <strong>Team:</strong> {userData.team}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Stats</h2>
          <p className="text-gray-600">Dashboard stats coming soon</p>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <p className="text-gray-600">Activity log coming soon</p>
        </div>
      </div>

      {/* Team-Specific Features */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Team Features</h2>
        <p className="text-gray-600">Navigate to your team section using the sidebar</p>
      </div>
    </div>
  );
}
