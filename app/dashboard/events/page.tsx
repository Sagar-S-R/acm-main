'use client';

import { useState, useEffect } from 'react';
import { apiCall, API_ENDPOINTS } from '@/lib/api';
import { useRouter } from 'next/navigation';

interface Event {
  _id: string;
  title: string;
  date: string;
  location: string;
  status: string;
  description: string;
}

export default function EventManagement() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await apiCall(API_ENDPOINTS.EVENTS);

      if (response.ok) {
        const data = await response.json();
        setEvents(data.events);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await apiCall(API_ENDPOINTS.EVENTS, {
        method: 'POST',
        body: JSON.stringify({
          ...formData,
          date: new Date(formData.date).toISOString(),
        }),
      });

      if (response.ok) {
        setFormData({ title: '', date: '', location: '', description: '' });
        setShowForm(false);
        fetchEvents();
      }
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    const token = localStorage.getItem('token');
    try {
      const response = await apiCall(`${API_ENDPOINTS.EVENTS}/${eventId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchEvents();
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Manage Events</h1>

      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {showForm ? 'Cancel' : 'Create Event'}
      </button>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <form onSubmit={handleCreateEvent}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Event Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
              <input
                type="datetime-local"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
              <input
                type="text"
                placeholder="Location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <textarea
              placeholder="Event Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4"
              rows={4}
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Create Event
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center text-gray-600">Loading events...</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left">Title</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Location</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-3">{event.title}</td>
                  <td className="px-6 py-3">{new Date(event.date).toLocaleString()}</td>
                  <td className="px-6 py-3">{event.location}</td>
                  <td className="px-6 py-3">
                    <span className={`px-3 py-1 rounded text-white ${event.status === 'completed' ? 'bg-green-600' : 'bg-blue-600'}`}>
                      {event.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-center">
                    <button
                      onClick={() => handleDeleteEvent(event._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {events.length === 0 && (
            <div className="text-center py-8 text-gray-600">No events found. Create one to get started!</div>
          )}
        </div>
      )}
    </div>
  );
}
