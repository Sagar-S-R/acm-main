'use client';

import { useState, useEffect } from 'react';
import { apiCall, API_ENDPOINTS } from '@/lib/api';
import { useRouter } from 'next/navigation';

interface User {
  _id: string;
  name: string;
  email: string;
  team: string;
  isActive: boolean;
}

const TEAMS = [
  'Design and Social Media',
  'Publicity',
  'Event Management',
  'Documentation',
  'Coverage',
  'Technical',
];

const ROLES = ['member', 'lead', 'admin', 'technical'];

export default function ManageUsers() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    team: 'Design and Social Media',
    role: 'member',
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await apiCall(API_ENDPOINTS.ADMIN_USERS);

      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      // First register the user
      const registerResponse = await apiCall(API_ENDPOINTS.REGISTER, {
        method: 'POST',
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          team: formData.team,
        }),
      });

      if (!registerResponse.ok) {
        alert('Error creating user');
        return;
      }

      const userData = await registerResponse.json();

      // Then create the role
      const roleResponse = await apiCall(API_ENDPOINTS.ADMIN_ROLES, {
        method: 'POST',
        body: JSON.stringify({
          userId: userData.user._id,
          role: formData.role,
          team: formData.team,
          canAccessTeams: formData.role === 'admin' || formData.role === 'technical' ? TEAMS : [formData.team],
        }),
      });

      if (roleResponse.ok) {
        setFormData({
          name: '',
          email: '',
          password: '',
          team: 'Design and Social Media',
          role: 'member',
        });
        setShowForm(false);
        fetchUsers();
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error creating user');
    }
  };

  const handleDeactivateUser = async (userId: string) => {
    const token = localStorage.getItem('token');
    try {
  const response = await apiCall(`${API_ENDPOINTS.ADMIN_USERS}/${userId}/deactivate`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchUsers();
      }
    } catch (error) {
      console.error('Error deactivating user:', error);
    }
  };

  const handleActivateUser = async (userId: string) => {
    const token = localStorage.getItem('token');
    try {
  const response = await apiCall(`${API_ENDPOINTS.ADMIN_USERS}/${userId}/activate`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchUsers();
      }
    } catch (error) {
      console.error('Error activating user:', error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Manage Users</h1>

      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {showForm ? 'Cancel' : 'Create User'}
      </button>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-8 max-w-2xl">
          <form onSubmit={handleCreateUser}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
              <select
                value={formData.team}
                onChange={(e) => setFormData({ ...formData, team: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                {TEAMS.map((team) => (
                  <option key={team} value={team}>
                    {team}
                  </option>
                ))}
              </select>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                {ROLES.map((role) => (
                  <option key={role} value={role}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Create User
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center text-gray-600">Loading users...</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Team</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-3">{user.name}</td>
                  <td className="px-6 py-3">{user.email}</td>
                  <td className="px-6 py-3">{user.team}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-3 py-1 rounded text-white ${
                        user.isActive ? 'bg-green-600' : 'bg-red-600'
                      }`}
                    >
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-center">
                    {user.isActive ? (
                      <button
                        onClick={() => handleDeactivateUser(user._id)}
                        className="px-3 py-1 bg-orange-600 text-white rounded hover:bg-orange-700 transition"
                      >
                        Deactivate
                      </button>
                    ) : (
                      <button
                        onClick={() => handleActivateUser(user._id)}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                      >
                        Activate
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && (
            <div className="text-center py-8 text-gray-600">No users found</div>
          )}
        </div>
      )}
    </div>
  );
}
