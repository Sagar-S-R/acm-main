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

export default function Profile() {
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
        <div className="text-2xl font-bold text-gray-600">Error loading profile</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Profile</h1>

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
        <div className="mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4">
            {userData.name.charAt(0).toUpperCase()}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">Full Name</label>
            <p className="text-xl text-gray-800">{userData.name}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">Email Address</label>
            <p className="text-xl text-gray-800">{userData.email}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">Team</label>
            <p className="text-xl text-gray-800">{userData.team}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">User ID</label>
            <p className="text-sm text-gray-600 font-mono">{userData._id}</p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Actions</h3>
          <div className="space-y-3">
            <p className="text-sm text-gray-600">Profile editing coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
}
