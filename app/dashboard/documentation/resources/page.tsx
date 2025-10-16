'use client';

import { useState, useEffect } from 'react';
import { apiCall, API_ENDPOINTS } from '@/lib/api';
import { useRouter } from 'next/navigation';

interface Resource {
  _id: string;
  title: string;
  category: string;
  url?: string;
  description: string;
}

const CATEGORIES = ['Tutorials', 'Documentation', 'Tools', 'Articles', 'Videos', 'Other'];

export default function ManageResources() {
  const router = useRouter();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Tutorials',
    url: '',
    description: '',
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    fetchResources();
  }, []);

  const fetchResources = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await apiCall(API_ENDPOINTS.RESOURCES);

      if (response.ok) {
        const data = await response.json();
        setResources(data.resources);
      }
    } catch (error) {
      console.error('Error fetching resources:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateResource = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await apiCall(API_ENDPOINTS.RESOURCES, {
        method: 'POST',
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ title: '', category: 'Tutorials', url: '', description: '' });
        setShowForm(false);
        fetchResources();
      }
    } catch (error) {
      console.error('Error creating resource:', error);
    }
  };

  const handleDeleteResource = async (resourceId: string) => {
    const token = localStorage.getItem('token');
    try {
      const response = await apiCall(`${API_ENDPOINTS.RESOURCES}/${resourceId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchResources();
      }
    } catch (error) {
      console.error('Error deleting resource:', error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Manage Resources</h1>

      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {showForm ? 'Cancel' : 'Add Resource'}
      </button>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <form onSubmit={handleCreateResource}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Resource Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <input
                type="url"
                placeholder="Resource URL (optional)"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4"
              rows={3}
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Add Resource
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center text-gray-600">Loading resources...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <div key={resource._id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{resource.title}</h3>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Category:</strong> {resource.category}
              </p>
              <p className="text-gray-600 mb-4">{resource.description}</p>
              {resource.url && (
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline mb-4 block"
                >
                  View Resource
                </a>
              )}
              <button
                onClick={() => handleDeleteResource(resource._id)}
                className="w-full px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {!loading && resources.length === 0 && (
        <div className="text-center py-8 text-gray-600">No resources found. Add one to get started!</div>
      )}
    </div>
  );
}
