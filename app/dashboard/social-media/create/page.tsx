'use client';

import { useState } from 'react';
import { apiCall, API_ENDPOINTS } from '@/lib/api';

const PLATFORMS = ['Instagram', 'Facebook', 'LinkedIn', 'Twitter', 'YouTube', 'Telegram', 'Discord'];

export default function CreatePost() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    platforms: ['Instagram'],
    scheduledFor: '',
    eventId: '',
  });
  const [creating, setCreating] = useState(false);
  const [message, setMessage] = useState('');

  const handlePlatformChange = (platform: string) => {
    setFormData((prev) => {
      const platforms = prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform];
      return { ...prev, platforms };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.platforms.length === 0) {
      setMessage('Please select at least one platform');
      return;
    }

    setCreating(true);
    const token = localStorage.getItem('token');

    try {
      const response = await apiCall(API_ENDPOINTS.SOCIAL_POSTS, {
        method: 'POST',
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Post created successfully!');
        setFormData({
          title: '',
          content: '',
          platforms: ['Instagram'],
          scheduledFor: '',
          eventId: '',
        });
        setTimeout(() => setMessage(''), 3000);
      } else {
        const data = await response.json();
        setMessage(data.message || 'Error creating post');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error creating post');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Create Social Media Post</h1>

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Post Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Post Content *</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              rows={6}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-3">Select Platforms *</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {PLATFORMS.map((platform) => (
                <label key={platform} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.platforms.includes(platform)}
                    onChange={() => handlePlatformChange(platform)}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="ml-2 text-gray-700">{platform}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Event (Optional)</label>
            <input
              type="text"
              placeholder="Event ID or name"
              value={formData.eventId}
              onChange={(e) => setFormData({ ...formData, eventId: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Schedule For (Optional)</label>
            <input
              type="datetime-local"
              value={formData.scheduledFor}
              onChange={(e) => setFormData({ ...formData, scheduledFor: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
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
            disabled={creating}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {creating ? 'Creating...' : 'Create Post'}
          </button>
        </form>
      </div>

      <div className="mt-8 max-w-2xl mx-auto bg-blue-50 p-6 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-2">Tips</h3>
        <ul className="text-sm text-gray-700 space-y-2">
          <li>• Keep content platform-specific and engaging</li>
          <li>• You can schedule posts for later posting</li>
          <li>• Link posts to specific events for better tracking</li>
          <li>• Posts are saved and can be edited or posted later</li>
        </ul>
      </div>
    </div>
  );
}
