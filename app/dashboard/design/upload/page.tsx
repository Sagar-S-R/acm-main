'use client';

import { useState } from 'react';
import { apiCall, API_ENDPOINTS } from '@/lib/api';

export default function UploadPoster() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eventName: '',
    visibility: 'private',
  });
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file');
      return;
    }

    setUploading(true);
    const token = localStorage.getItem('token');

    try {
      // For now, we'll send the data without file upload (file upload requires multer setup)
      const response = await apiCall(API_ENDPOINTS.POSTERS, {
        method: 'POST',
        body: JSON.stringify({
          ...formData,
          imageUrl: file.name, // In production, upload to cloud storage first
        }),
      });

      if (response.ok) {
        setMessage('Poster uploaded successfully!');
        setFormData({ title: '', description: '', eventName: '', visibility: 'private' });
        setFile(null);
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Error uploading poster');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error uploading poster');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Upload Poster</h1>

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Poster Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Event Name *</label>
            <input
              type="text"
              value={formData.eventName}
              onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              rows={4}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Visibility</label>
            <select
              value={formData.visibility}
              onChange={(e) => setFormData({ ...formData, visibility: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="private">Private (Team Only)</option>
              <option value="public">Public (After Approval)</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Upload Poster Image *</label>
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
            {file && <p className="text-sm text-gray-600 mt-2">Selected: {file.name}</p>}
          </div>

          {message && (
            <div
              className={`mb-6 px-4 py-3 rounded ${
                message.includes('Error') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
              }`}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={uploading}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : 'Upload Poster'}
          </button>
        </form>
      </div>

      <div className="mt-8 max-w-2xl mx-auto bg-blue-50 p-6 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-2">Information</h3>
        <ul className="text-sm text-gray-700 space-y-2">
          <li>• Private posters are only visible to the Design team</li>
          <li>• Public posters require admin/technical approval</li>
          <li>• Approved posters will be displayed on the upcoming events section</li>
        </ul>
      </div>
    </div>
  );
}
