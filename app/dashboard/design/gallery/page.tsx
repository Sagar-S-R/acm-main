'use client';

import { useState, useEffect } from 'react';
import { apiCall, API_ENDPOINTS } from '@/lib/api';
import { useRouter } from 'next/navigation';

interface Poster {
  _id: string;
  title: string;
  eventName: string;
  description: string;
  imageUrl: string;
  visibility: string;
  isApproved: boolean;
  approvedBy?: string;
}

export default function DesignGallery() {
  const router = useRouter();
  const [posters, setPosters] = useState<Poster[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    fetchPosters();
  }, []);

  const fetchPosters = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await apiCall(API_ENDPOINTS.MY_POSTERS);

      if (response.ok) {
        const data = await response.json();
        setPosters(data.posters);
      }
    } catch (error) {
      console.error('Error fetching posters:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePoster = async (posterId: string) => {
    const token = localStorage.getItem('token');
    try {
      const response = await apiCall(`${API_ENDPOINTS.POSTERS}/${posterId}`, { method: 'DELETE' });

      if (response.ok) {
        fetchPosters();
      }
    } catch (error) {
      console.error('Error deleting poster:', error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Design Gallery</h1>

      {loading ? (
        <div className="text-center text-gray-600">Loading gallery...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posters.map((poster) => (
            <div key={poster._id} className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
              {/* Placeholder for image */}
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                <span>[{poster.eventName}]</span>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{poster.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{poster.eventName}</p>
                <p className="text-gray-600 text-sm mb-3">{poster.description}</p>

                <div className="flex gap-2 mb-4 flex-wrap">
                  <span
                    className={`px-2 py-1 rounded text-xs text-white ${
                      poster.visibility === 'private' ? 'bg-orange-600' : 'bg-blue-600'
                    }`}
                  >
                    {poster.visibility}
                  </span>
                  <span
                    className={`px-2 py-1 rounded text-xs text-white ${
                      poster.isApproved ? 'bg-green-600' : 'bg-yellow-600'
                    }`}
                  >
                    {poster.isApproved ? 'Approved' : 'Pending'}
                  </span>
                </div>

                <button
                  onClick={() => handleDeletePoster(poster._id)}
                  className="w-full px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && posters.length === 0 && (
        <div className="text-center py-12 text-gray-600">
          <p className="mb-4">No posters in your gallery yet</p>
          <a href="/dashboard/design/upload" className="text-blue-600 hover:underline">
            Upload your first poster
          </a>
        </div>
      )}
    </div>
  );
}
