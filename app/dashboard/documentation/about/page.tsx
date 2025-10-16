'use client';

import { useState, useEffect } from 'react';
import { apiCall, API_ENDPOINTS } from '@/lib/api';
import { useRouter } from 'next/navigation';

interface AboutSection {
  name: string;
  content: string;
  lastUpdatedBy: string;
  lastUpdatedAt: string;
}

const SECTION_NAMES = ['mission', 'vision', 'about', 'team', 'achievements'];

export default function ManageAboutPage() {
  const router = useRouter();
  const [sections, setSections] = useState<AboutSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [content, setContent] = useState('');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    fetchAboutPage();
  }, []);

  const fetchAboutPage = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await apiCall(API_ENDPOINTS.ABOUT);

      if (response.ok) {
        const data = await response.json();
        setSections(data.aboutPage || []);
      }
    } catch (error) {
      console.error('Error fetching about page:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSection = async () => {
    if (!editingSection) return;

    const token = localStorage.getItem('token');
    try {
      const response = await apiCall(API_ENDPOINTS.ABOUT, {
        method: 'POST',
        body: JSON.stringify({
          name: editingSection,
          content,
        }),
      });

      if (response.ok) {
        setEditingSection(null);
        setContent('');
        fetchAboutPage();
      }
    } catch (error) {
      console.error('Error saving section:', error);
    }
  };

  const handleDeleteSection = async (sectionName: string) => {
    const token = localStorage.getItem('token');
    try {
      const response = await apiCall(`${API_ENDPOINTS.ABOUT}/${sectionName}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchAboutPage();
      }
    } catch (error) {
      console.error('Error deleting section:', error);
    }
  };

  const startEdit = (sectionName: string) => {
    const section = sections.find((s) => s.name === sectionName);
    setEditingSection(sectionName);
    setContent(section?.content || '');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Manage About Page</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Available Sections */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Sections</h2>
          <div className="space-y-2">
            {SECTION_NAMES.map((sectionName) => (
              <button
                key={sectionName}
                onClick={() => startEdit(sectionName)}
                className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-blue-100 rounded transition capitalize"
              >
                {sectionName}
              </button>
            ))}
          </div>
        </div>

        {/* Editor */}
        <div className="lg:col-span-2">
          {editingSection ? (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 capitalize">{editingSection}</h2>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4"
                rows={8}
              />
              <div className="flex gap-4">
                <button
                  onClick={handleSaveSection}
                  className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingSection(null)}
                  className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteSection(editingSection)}
                  className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition ml-auto"
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Current Sections</h2>
              {loading ? (
                <p className="text-gray-600">Loading...</p>
              ) : sections.length === 0 ? (
                <p className="text-gray-600">No sections created yet. Select a section to create one.</p>
              ) : (
                <div className="space-y-6">
                  {sections.map((section) => (
                    <div key={section.name} className="border-b pb-4">
                      <h3 className="text-base font-semibold text-gray-800 capitalize mb-2">{section.name}</h3>
                      <p className="text-gray-600 mb-2">{section.content}</p>
                      <p className="text-xs text-gray-400">
                        Last updated by {section.lastUpdatedBy} on {new Date(section.lastUpdatedAt).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
