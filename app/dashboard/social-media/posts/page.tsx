'use client';

import { useState, useEffect } from 'react';
import { apiCall, API_ENDPOINTS } from '@/lib/api';
import { useRouter } from 'next/navigation';

interface Post {
  _id: string;
  title: string;
  content: string;
  platforms: string[];
  status: string;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
  };
  createdAt: string;
}

export default function MyPosts() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await apiCall(API_ENDPOINTS.MY_SOCIAL_POSTS);

      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (postId: string) => {
    const token = localStorage.getItem('token');
    try {
      const response = await apiCall(`${API_ENDPOINTS.SOCIAL_POSTS}/${postId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchPosts();
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const filteredPosts = filter === 'all' ? posts : posts.filter((p) => p.status === filter);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Social Media Posts</h1>

      <div className="mb-6 flex gap-4">
        {['all', 'draft', 'scheduled', 'posted'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded capitalize transition ${
              filter === status
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {status === 'all' ? 'All Posts' : status}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center text-gray-600">Loading posts...</div>
      ) : (
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <div key={post._id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{post.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{new Date(post.createdAt).toLocaleString()}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded text-sm text-white capitalize ${
                    post.status === 'posted' ? 'bg-green-600' : post.status === 'scheduled' ? 'bg-blue-600' : 'bg-gray-600'
                  }`}
                >
                  {post.status}
                </span>
              </div>

              <p className="text-gray-700 mb-4">{post.content}</p>

              <div className="flex gap-3 mb-4 flex-wrap">
                {post.platforms.map((platform) => (
                  <span key={platform} className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                    {platform}
                  </span>
                ))}
              </div>

              {post.status === 'posted' && (
                <div className="grid grid-cols-3 gap-4 py-4 border-t border-b mb-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-800">{post.engagement.likes}</p>
                    <p className="text-sm text-gray-600">Likes</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-800">{post.engagement.comments}</p>
                    <p className="text-sm text-gray-600">Comments</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-800">{post.engagement.shares}</p>
                    <p className="text-sm text-gray-600">Shares</p>
                  </div>
                </div>
              )}

              <button
                onClick={() => handleDeletePost(post._id)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {!loading && filteredPosts.length === 0 && (
        <div className="text-center py-12 text-gray-600">
          <p className="mb-4">No {filter !== 'all' ? filter : ''} posts found</p>
          <a href="/dashboard/social-media/create" className="text-blue-600 hover:underline">
            Create your first post
          </a>
        </div>
      )}
    </div>
  );
}
