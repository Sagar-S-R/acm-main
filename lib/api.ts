// API Configuration
export const API_BASE_URL = 'http://localhost:5001';

export const API_ENDPOINTS = {
  // Auth
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  REGISTER: `${API_BASE_URL}/api/auth/register`,
  GET_ME: `${API_BASE_URL}/api/auth/me`,

  // Documentation
  EVENTS: `${API_BASE_URL}/api/documentation/events`,
  RESOURCES: `${API_BASE_URL}/api/documentation/resources`,
  ABOUT: `${API_BASE_URL}/api/documentation/about`,

  // Design
  POSTERS: `${API_BASE_URL}/api/design/posters`,
  MY_POSTERS: `${API_BASE_URL}/api/design/my-posters`,

  // Social Media
  SOCIAL_POSTS: `${API_BASE_URL}/api/social-media`,
  MY_SOCIAL_POSTS: `${API_BASE_URL}/api/social-media/my-posts`,

  // Admin
  ADMIN_USERS: `${API_BASE_URL}/api/admin/users`,
  ADMIN_ROLES: `${API_BASE_URL}/api/admin/roles/create`,
  TEAMS_STATS: `${API_BASE_URL}/api/admin/stats/teams`,
  TEAMS: `${API_BASE_URL}/api/teams`,
};

// Helper function for API calls with auth
export async function apiCall(
  endpoint: string,
  options: RequestInit = {}
) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (options.headers && typeof options.headers === 'object') {
    Object.assign(headers, options.headers);
  }

  const response = await fetch(endpoint, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    // Token expired, redirect to login
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
  }

  return response;
}
